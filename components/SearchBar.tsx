import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TextInput, View } from "react-native";

type Props = {
  value: string;
  onChange: (text: string) => void;
};

export const SearchBar = ({ value, onChange }: Props) => {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color="#999" />
      <TextInput
        placeholder="Search coffee"
        placeholderTextColor="#999"
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
    backgroundColor: "#1E1E1E",
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    flex: 1,
  },
  input: {
    marginLeft: 8,
    color: "#fff",
    flex: 1,
  },
});
