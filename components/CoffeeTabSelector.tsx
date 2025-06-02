import { colors } from "@/constants/colors";
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
    backgroundColor: colors.grayLight,
    marginRight: 8,
  },
  selectedTab: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: 14,
    color: colors.gray,
  },
  selectedTabText: {
    color: colors.white,
    fontWeight: "bold",
  },
});
