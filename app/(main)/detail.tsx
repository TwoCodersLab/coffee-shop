import { colors } from "@/constants/colors";
import { copies } from "@/constants/copies";
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
        <Text style={styles.headerTitle}>{copies.detail.detail}</Text>
        <Ionicons name="heart-outline" size={24} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.padding16}>
        <Image source={{ uri: params.image }} style={styles.image} />

        <View style={styles.titleSection}>
          <Text style={styles.name}>{params.name}</Text>
          <View style={styles.iconRow}>
            {["bicycle", "cafe", "cube"].map((icon) => (
              <View key={icon} style={styles.iconBox}>
                <Ionicons name={icon as any} size={20} color={colors.primary} />
              </View>
            ))}
          </View>
        </View>

        <View style={styles.ratingRow}>
          <Ionicons name="star" size={16} color={colors.accent} />
          <Text style={styles.ratingText}>{params.rating}</Text>
          <Text style={styles.reviewCount}>{copies.detail.reviews}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{copies.detail.descriptionTitle}</Text>
          <Text style={styles.description}>
            {copies.detail.description}{" "}
            <Text style={styles.readMore}>{copies.detail.readMore}</Text>
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{copies.detail.size}</Text>
          <View style={styles.sizeOptions}>{sizeButtons}</View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View>
          <Text style={styles.footerLabel}>{copies.detail.price}</Text>
          <Text style={styles.footerPrice}>${priceFormatted}</Text>
        </View>
        <TouchableOpacity style={styles.buyButton} onPress={handleBuyNow}>
          <Text style={styles.buyText}>{copies.detail.buyNow}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
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
    color: colors.text,
  },
  iconRow: {
    flexDirection: "row",
    gap: 10,
  },
  iconBox: {
    backgroundColor: colors.lightGray,
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
    color: colors.gray,
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
    color: colors.gray,
    lineHeight: 20,
  },
  readMore: {
    color: colors.primary,
    fontWeight: "600",
  },
  sizeOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sizeButton: {
    borderWidth: 1,
    borderColor: colors.grayLight,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    flex: 1,
    alignItems: "center",
    marginRight: 10,
  },
  selectedSize: {
    borderColor: colors.primary,
  },
  sizeText: {
    fontWeight: "500",
    color: colors.text,
  },
  selectedSizeText: {
    color: colors.primary,
    fontWeight: "700",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: colors.white,
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
  buyButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 16,
  },
  buyText: {
    color: colors.white,
    fontWeight: "600",
    fontSize: 16,
  },
  padding16: {
    paddingHorizontal: 16,
  },
});
