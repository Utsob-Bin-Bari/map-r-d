import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Fonts } from '../constants/fonts.constants';
import { colors, spacing } from '../styles/theme';

/** Font weights that are actually loaded in app.json (expo-font plugin) */
const LOADED_FONTS = new Set([
  'DMSans-Black',
  'DMSans-Bold',
  'DMSans-ExtraBold',
  'DMSans-ExtraLight',
  'DMSans-Light',
  'DMSans-Medium',
  'DMSans-Regular',
  'DMSans-SemiBold',
  'DMSans-Thin',
  'CormorantGaramond-Bold',
  'CormorantGaramond-SemiBold',
  'CormorantGaramond-Medium',
  'CormorantGaramond-Regular',
  'CormorantGaramond-Light',
]);

function FontRow({
  label,
  fontFamily,
  sampleText = 'The quick brown fox jumps over the lazy dog.',
}: {
  label: string;
  fontFamily: string;
  sampleText?: string;
}) {
  const isLoaded = LOADED_FONTS.has(fontFamily);
  return (
    <View style={styles.row}>
      <View style={styles.rowHeader}>
        <Text style={styles.label}>{label}</Text>
        {!isLoaded && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Not loaded</Text>
          </View>
        )}
      </View>
      <Text style={[styles.sample, { fontFamily }]} numberOfLines={2}>
        {sampleText}
      </Text>
    </View>
  );
}

function FontSection({
  title,
  fontFamilyMap,
}: {
  title: string;
  fontFamilyMap: Record<string, string>;
}) {
  const entries = Object.entries(fontFamilyMap);
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {entries.map(([key, fontFamily]) => (
        <FontRow
          key={key}
          label={key}
          fontFamily={fontFamily}
        />
      ))}
    </View>
  );
}

export function FontTestScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backBtn}
          activeOpacity={0.8}
        >
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Font test</Text>
      </View>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <FontSection title="DM Sans" fontFamilyMap={Fonts.dmSans} />
        <FontSection title="Cormorant Garamond" fontFamilyMap={Fonts.cormorantGaramond} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backBtn: {
    paddingVertical: spacing.sm,
    paddingRight: spacing.md,
  },
  backText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: spacing.lg * 2,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
  },
  row: {
    marginBottom: spacing.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  rowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  label: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  badge: {
    backgroundColor: colors.error,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 10,
    color: colors.background,
    fontWeight: '600',
  },
  sample: {
    fontSize: 16,
    color: colors.text,
  },
});
