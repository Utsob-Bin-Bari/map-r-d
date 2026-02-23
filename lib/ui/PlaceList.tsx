import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import type { PlacePrediction } from '../services/places';
import { colors, spacing } from '../styles/theme';

type PlaceListProps = {
  predictions: PlacePrediction[];
  onSelect: (item: PlacePrediction) => void;
};

export function PlaceList({ predictions, onSelect }: PlaceListProps) {
  if (predictions.length === 0) return null;

  return (
    <View style={styles.container}>
      <FlatList
        data={predictions}
        keyExtractor={(item) => item.place_id}
        keyboardShouldPersistTaps="handled"
        style={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => onSelect(item)}
            activeOpacity={0.7}
          >
            <Text style={styles.mainText} numberOfLines={1}>
              {item.structured_formatting?.main_text ?? item.description}
            </Text>
            {item.structured_formatting?.secondary_text && (
              <Text style={styles.secondaryText} numberOfLines={1}>
                {item.structured_formatting.secondary_text}
              </Text>
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    maxHeight: 240,
    backgroundColor: colors.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  list: {
    maxHeight: 240,
  },
  item: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  mainText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  secondaryText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
});
