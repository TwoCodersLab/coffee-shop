import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { useOnboardingLogic } from "@/hooks/useOnboardingLogic";

export default function OnboardingScreen() {
  const { handleGetStarted } = useOnboardingLogic();

  return (
    <ImageBackground
      source={require("@/assets/images/onboardingBackground.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      <View style={styles.content}>
        <Text style={styles.title}>HOME</Text>
        <Text style={styles.subtitle}>
          Welcome to your daily coffee connection, where every cup is a
          delightful moment.
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  content: {
    padding: 32,
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#eee",
    textAlign: "center",
    marginBottom: 32,
  },
  button: {
    backgroundColor: "#D17842",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 30,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
