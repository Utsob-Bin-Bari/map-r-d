import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import { useGlobalContainerStyles } from "@/styles/global.container.style";
import { useTheme } from "@/contexts/ThemeContext";
import { useState } from "react";
import { StepTracker } from "@/ui/stepTracker.ui";
import { ProfessionalBackground } from "@/components/ProfessionalBackground.onboarding.component";
import { OfferedService } from "@/components/OfferedService.onboarding.component";
import { LocationSelection } from "@/components/LocationSelection.onboarding.component";
import { ProfileBio } from "@/components/ProfileBio.onboarding";
import { DocumentVerification } from "@/components/DocumentVerification.onboarding.component";
import { Button } from "@/ui/button.ui";
import { NATIVE_SAFE_AREA_INSETS } from "@/styles/variables.style";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const OnboardingScreen = () => {
  const { theme } = useTheme();
  const GlobalContainerStyles = useGlobalContainerStyles(theme);
  const insets = useSafeAreaInsets();
  const [activeStep, setActiveStep] = useState(1);
  const totalSteps = 5;
  const buttonWidth = Dimensions.get('window').width * 0.9;
  const halfButtonWidth = Dimensions.get('window').width * 0.45;
  const handleNextStep = () => {
      setActiveStep(activeStep + 1);
  };

  const handlePreviousStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };

  const renderContent = () => {
    switch (activeStep) {
      case 1:
        return <ProfessionalBackground/>;
      case 2:
        return <OfferedService />;
      case 3:
        return <LocationSelection  />;
      case 4:
        return <ProfileBio />;
      case 5:
        return <DocumentVerification />;
      default:
        return null;
    }
  };

  return (
    <View style={GlobalContainerStyles.wrapperFlexWithPaddingToHeader}>
      <View style={[GlobalContainerStyles.wrapper, {flex:1, paddingBottom: NATIVE_SAFE_AREA_INSETS.getPaddingBottom(insets)}]}>
        <View style={styles.stepTrackerContainer}>
          <StepTracker activeStep={activeStep} totalSteps={totalSteps} />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.contentContainer}>
            {renderContent()}
          </View>
        </ScrollView>
        { activeStep === 1 &&
            <Button text="Next" onPress={handleNextStep} width={buttonWidth} />
        }
        { activeStep > 1 && activeStep <= totalSteps &&
          <View style={styles.buttonContainer}>
            <Button text="Previous" buttonBackgroundColor="transparent" onPress={handlePreviousStep} width={halfButtonWidth} />
            <Button text="Next" onPress={handleNextStep} width={halfButtonWidth} />
          </View>
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  stepTrackerContainer: {
    width: "90%",
    alignSelf: "center",
  },
  contentContainer: {
    width: "100%",
  },
  buttonContainer: {
    width: "100%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
});
