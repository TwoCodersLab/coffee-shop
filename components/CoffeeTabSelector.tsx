import { Pressable, ScrollView, StyleSheet, Text } from "react-native";

type Props = {
  tabs: string[];
  selected: string;
  onSelect: (tab: string) => void;
};

export const CoffeeTabSelector = ({ tabs, selected, onSelect }: Props) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      {tabs.map((tab) => {
        const isSelected = selected === tab;
        return (
          <Pressable
            key={tab}
            style={[styles.tab, isSelected && styles.selectedTab]}
            onPress={() => onSelect(tab)}
          >
            <Text
              style={[styles.tabText, isSelected && styles.selectedTabText]}
            >
              {tab}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 8 },
  tab: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: "#eee",
    marginRight: 8,
  },
  selectedTab: {
    backgroundColor: "#C67C4E",
  },
  tabText: {
    fontSize: 14,
    color: "#555",
  },
  selectedTabText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
