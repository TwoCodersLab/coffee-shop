import {
  View,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
  Platform,
} from "react-native";

export default function OnboardingScreen() {
  return (
    <View style={styles.root}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <View style={styles.topHalf}>
        <Image
          source={require("@/assets/images/onboardingBackground.png")}
          resizeMode="cover"
          style={styles.image}
        />
      </View>

      <View style={styles.bottomHalf} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "black",
  },
  topHalf: {
    flex: 1,
    width: "100%",
    overflow: "hidden",
    marginTop: -0,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  bottomHalf: {
    flex: 1,
    backgroundColor: "black",
  },
});
