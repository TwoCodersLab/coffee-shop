import { useCartStore } from "@/hooks/useCartStore";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    id?: string;
    name?: string;
    image?: string;
    rating?: string;
    price?: string;
    type?: string;
  }>();

  const [selectedSize, setSelectedSize] = useState("M");

  const handleBackPress = useCallback(() => {
    router.back();
  }, [router]);

  const handleSizePress = useCallback((size: string) => {
    setSelectedSize(size);
  }, []);

  const handleBuyNow = useCallback(() => {
    useCartStore.getState().addItem({
      id: Number(params.id),
      name: params.name!,
      price: Number(params.price),
      type: params.type!,
      image: params.image!,
    });
    router.push("/(main)/cart");
  }, [params, router]);

  const priceFormatted = useMemo(
    () => Number(params.price ?? "0").toFixed(2),
    [params.price]
  );

  const sizeButtons = useMemo(
    () =>
      ["S", "M", "L"].map((size) => {
        const isSelected = selectedSize === size;
        const buttonStyle = [
          styles.sizeButton,
          isSelected && styles.selectedSize,
        ].filter(Boolean);
        const textStyle = [
          styles.sizeText,
          isSelected && styles.selectedSizeText,
        ].filter(Boolean);
        return (
          <TouchableOpacity
            key={size}
            style={buttonStyle}
            onPress={() => handleSizePress(size)}
          >
            <Text style={textStyle}>{size}</Text>
          </TouchableOpacity>
        );
      }),
    [selectedSize, handleSizePress]
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress}>
          <Ionicons name="chevron-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detail</Text>
        <Ionicons name="heart-outline" size={24} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.padding16}>
        <Image source={{ uri: params.image }} style={styles.image} />

        <View style={styles.titleSection}>
          <Text style={styles.name}>{params.name}</Text>
          <View style={styles.iconRow}>
            {["bicycle", "cafe", "cube"].map((icon) => (
              <View key={icon} style={styles.iconBox}>
                <Ionicons name={icon as any} size={20} color="#C67C4E" />
              </View>
            ))}
          </View>
        </View>

        <View style={styles.ratingRow}>
          <Ionicons name="star" size={16} color="#FACC15" />
          <Text style={styles.ratingText}>{params.rating}</Text>
          <Text style={styles.reviewCount}>(230)</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>
            A cappuccino is an approximately 150 ml (5 oz) beverage, with 25 ml
            of espresso coffee and 85 ml of fresh milk the fo...{" "}
            <Text style={styles.readMore}>Read More</Text>
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Size</Text>
          <View style={styles.sizeOptions}>{sizeButtons}</View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View>
          <Text style={styles.footerLabel}>Price</Text>
          <Text style={styles.footerPrice}>${priceFormatted}</Text>
        </View>
        <TouchableOpacity style={styles.buyButton} onPress={handleBuyNow}>
          <Text style={styles.buyText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 20,
    marginBottom: 16,
  },
  titleSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
  },
  iconRow: {
    flexDirection: "row",
    gap: 10,
  },
  iconBox: {
    backgroundColor: "#F3F3F3",
    borderRadius: 12,
    padding: 8,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  ratingText: {
    marginLeft: 4,
    fontWeight: "600",
  },
  reviewCount: {
    marginLeft: 4,
    color: "#888",
    fontSize: 12,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 8,
  },
  description: {
    color: "#888",
    lineHeight: 20,
  },
  readMore: {
    color: "#C67C4E",
    fontWeight: "600",
  },
  sizeOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sizeButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    flex: 1,
    alignItems: "center",
    marginRight: 10,
  },
  selectedSize: {
    borderColor: "#C67C4E",
  },
  sizeText: {
    fontWeight: "500",
    color: "#333",
  },
  selectedSizeText: {
    color: "#C67C4E",
    fontWeight: "700",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 10,
  },
  footerLabel: {
    fontSize: 12,
    color: "#888",
  },
  footerPrice: {
    fontSize: 18,
    fontWeight: "700",
  },
  buyButton: {
    backgroundColor: "#C67C4E",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 16,
  },
  buyText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  padding16: {
    paddingHorizontal: 16,
  },
});
