import { colors } from "@/constants/colors";
import { useOnboardingLogic } from "@/hooks/useOnboardingLogic";
import {
  Dimensions,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { height } = Dimensions.get("window");

export default function OnboardingScreen() {
  const { handleGetStarted } = useOnboardingLogic();

  return (
    <>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <ImageBackground
        source={require("@/assets/images/onboardingBackground.png")}
        style={styles.backgroundImage}
        resizeMode="contain"
      />
      <View style={styles.background} />

      <View style={styles.contentContainer}>
        <Text style={styles.title}>
          Fall in Love with{"\n"}Coffee in Blissful Delight!
        </Text>
        <Text style={styles.subtitle}>
          Welcome to our cozy coffee corner, where{"\n"}
          every cup is a delightful for you.
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    position: "absolute",
    top: -(height * 0.2),
    height: height,
    width: "100%",
    backgroundColor: "black",
    zIndex: 100,
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "black",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 40,
    paddingHorizontal: 24,
    zIndex: 200,
    gap: 12,
  },
  title: {
    fontFamily: "Sora-SemiBold",
    fontSize: 32,
    lineHeight: 48,
    letterSpacing: 0.16,
    textAlign: "center",
    color: "white",
  },
  subtitle: {
    fontFamily: "Sora",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.14,
    textAlign: "center",
    color: colors.subtitle,
    marginBottom: 32,
  },
  button: {
    backgroundColor: colors.buttonBackground,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 14,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Sora-SemiBold",
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0,
    color: colors.white,
    textAlign: "center",
  },
});
