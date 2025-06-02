import { colors } from "@/constants/colors";
import { copies } from "@/constants/copies";
import { useCartStore } from "@/hooks/useCartStore";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CartScreen() {
  const router = useRouter();
  const { items, increase, decrease, clear } = useCartStore();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={router.back}>
          <Ionicons name="chevron-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{copies.cart.title}</Text>
        <Ionicons name="cart-outline" size={24} color={colors.white} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {items.map((item) => (
          <View key={item.id} style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.type}>{item.type}</Text>
              <Text style={styles.price}>${item.price.toFixed(2)}</Text>
              <View style={styles.quantityRow}>
                <TouchableOpacity onPress={() => decrease(item.id)}>
                  <Ionicons
                    name="remove-circle"
                    size={24}
                    color={colors.primary}
                  />
                </TouchableOpacity>
                <Text style={styles.quantity}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => increase(item.id)}>
                  <Ionicons
                    name="add-circle"
                    size={24}
                    color={colors.primary}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.total}>
              ${(item.price * item.quantity).toFixed(2)}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View>
          <Text style={styles.footerLabel}>{copies.cart.total}</Text>
          <Text style={styles.footerPrice}>${total.toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.checkoutButton} onPress={clear}>
          <Text style={styles.checkoutText}>{copies.cart.checkout}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
  },
  scroll: {
    paddingBottom: 100,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.backgroundLight,
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontWeight: "600",
    fontSize: 16,
  },
  type: {
    fontSize: 12,
    color: colors.gray,
  },
  price: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 4,
  },
  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 12,
  },
  quantity: {
    fontSize: 16,
    fontWeight: "600",
  },
  total: {
    fontWeight: "600",
    fontSize: 14,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    paddingBottom: 32,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: colors.black,
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 10,
  },
  footerLabel: {
    fontSize: 12,
    color: colors.gray,
  },
  footerPrice: {
    fontSize: 18,
    fontWeight: "700",
  },
  checkoutButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 16,
  },
  checkoutText: {
    color: colors.white,
    fontWeight: "600",
    fontSize: 16,
  },
});
