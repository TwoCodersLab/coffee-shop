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
      text1: "Added to cart",
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
          <Ionicons name="star" size={14} color="#FACC15" />
          <Text style={styles.ratingText}>{rating}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.price}>${price.toFixed(2)}</Text>
        <Pressable style={styles.addButton} onPress={handleAddToCart}>
          <Ionicons name="add" size={18} color="#fff" />
        </Pressable>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    shadowColor: "#000",
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
    color: "#333",
  },
  type: {
    fontSize: 12,
    color: "#888",
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
    color: "#666",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  addButton: {
    backgroundColor: "#C67C4E",
    padding: 6,
    borderRadius: 10,
  },
});
