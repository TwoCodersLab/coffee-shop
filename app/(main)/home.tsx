import { CartButton } from "@/components/CartButton";
import { CoffeeCard } from "@/components/CoffeeCard";
import { CoffeeTabSelector } from "@/components/CoffeeTabSelector";
import { PromoBanner } from "@/components/PromoBanner";
import { SearchBar } from "@/components/SearchBar";
import { colors } from "@/constants/colors";
import { ALL_COFFEE, useCoffees } from "@/hooks/useCoffees";
import { useMemo, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { coffees, loading, types } = useCoffees();
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState(ALL_COFFEE);

  const filteredCoffees = useMemo(() => {
    return coffees.filter((c) => {
      const matchType = selectedType === ALL_COFFEE || c.type === selectedType;
      const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
      return matchType && matchSearch;
    });
  }, [coffees, selectedType, search]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.darkBackground} />
      <View style={styles.headerContent}>
        <View style={styles.searchBarWrapper}>
          <SearchBar value={search} onChange={setSearch} />
          <CartButton />
        </View>

        <PromoBanner />
        <CoffeeTabSelector
          tabs={types}
          selected={selectedType}
          onSelect={setSelectedType}
        />
      </View>
      <ScrollView style={styles.flex}>
        <View style={styles.cardsWrapper}>
          {loading ? (
            <View style={styles.flex}>
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
          ) : (
            filteredCoffees.map((coffee) => (
              <CoffeeCard key={coffee.id} {...coffee} />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    position: "relative",
  },
  darkBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 220,
    backgroundColor: colors.darkBackground,
    zIndex: 0,
  },
  headerContent: {
    zIndex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  flex: {
    flex: 1,
  },
  cardsWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  searchBarWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
