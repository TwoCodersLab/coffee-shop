import * as Font from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [fontsLoaded] = Font.useFonts({
    Sora: require("../assets/fonts/Sora-Regular.ttf"),
    "Sora-SemiBold": require("../assets/fonts/Sora-SemiBold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return <Slot />;
}
