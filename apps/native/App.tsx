import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button } from "@repo/ui";

export default function Native() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Torvii Native App</Text>
      <Button
        onClick={() => {
          alert("Pressed!");
        }}
        text="Boop"
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontWeight: "bold",
    marginBottom: 20,
    fontSize: 36,
  },
});
