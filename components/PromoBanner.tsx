import { Image, StyleSheet, View } from "react-native";

export const PromoBanner = () => {
  return (
    <View style={styles.banner}>
      <Image source={require("@/assets/images/promo.png")} resizeMode="cover" />
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    borderRadius: 16,
    marginBottom: 16,
    position: "relative",
    width: "100%",
    alignItems: "center",
  },
});
