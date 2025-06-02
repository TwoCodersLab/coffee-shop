import { colors } from "@/constants/colors";
import { copies } from "@/constants/copies";
import { useCartStore } from "@/hooks/useCartStore";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

type Props = {
  id: number;
  name: string;
  type: string;
  price: number;
  rating: number;
  image: ImageSourcePropType;
};

export const CoffeeCard = ({ id, name, type, price, rating, image }: Props) => {
  const router = useRouter();

  const handlePress = useCallback(() => {
    router.push({
      pathname: "/(main)/detail",
      params: {
        id,
        name,
        type,
        price: price.toString(),
        rating: rating.toString(),
        image: Image.resolveAssetSource(image).uri,
      },
    });
  }, [router, id, name, type, price, rating, image]);

  const handleAddToCart = useCallback(() => {
    useCartStore.getState().addItem({
      id,
      name,
      type,
      price,
      image: Image.resolveAssetSource(image).uri,
    });

    Toast.show({
      type: "success",
      text1: copies.coffeeCard.toastAdded,
      position: "bottom",
    });
  }, [id, name, type, price, image]);

  return (
    <TouchableOpacity onPress={handlePress} style={styles.card}>
      <Image source={image} style={styles.image} resizeMode="cover" />

      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.type}>{type}</Text>
        <View style={styles.ratingRow}>
          <Ionicons name="star" size={14} color={colors.accent} />
          <Text style={styles.ratingText}>{rating}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.price}>${price.toFixed(2)}</Text>
        <Pressable style={styles.addButton} onPress={handleAddToCart}>
          <Ionicons name="add" size={18} color={colors.white} />
        </Pressable>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    shadowColor: colors.black,
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 12,
    marginBottom: 8,
  },
  infoContainer: {
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
  },
  type: {
    fontSize: 12,
    color: colors.grayDark,
    marginTop: 2,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 12,
    color: colors.grayDarker,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.text,
  },
  addButton: {
    backgroundColor: colors.primary,
    padding: 6,
    borderRadius: 10,
  },
});
