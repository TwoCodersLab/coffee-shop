import { colors } from "@/constants/colors";
import { useCartStore } from "@/hooks/useCartStore";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const CartButton = () => {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const total = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <TouchableOpacity
      onPress={() => router.push("/(main)/cart")}
      style={styles.button}
    >
      <Ionicons name="cart-outline" size={24} color={colors.white} />
      {total > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{total}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    marginLeft: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    padding: 10,
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: colors.accent,
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
    minWidth: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: colors.black,
    fontSize: 12,
    fontWeight: "600",
  },
});
