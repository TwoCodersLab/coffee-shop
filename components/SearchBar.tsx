import { colors } from "@/constants/colors";
import { copies } from "@/constants/copies";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TextInput, View } from "react-native";

type Props = {
  value: string;
  onChange: (text: string) => void;
};

export const SearchBar = ({ value, onChange }: Props) => {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color={colors.gray} />
      <TextInput
        placeholder={copies.searchBar.placeholder}
        placeholderTextColor={colors.gray}
        value={value}
        onChangeText={onChange}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primaryDark,
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    flex: 1,
  },
  input: {
    marginLeft: 8,
    color: colors.white,
    flex: 1,
  },
});
