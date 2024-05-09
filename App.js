import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import ChatGPT from "./src/ChatBox";
import ProductDescription from "./src/ProductDescription";
import HTMLContentDisplay from "./src/HTMLContentDisplay";
import ThreeDModelGenerator from "./src/3DModelGenerator";

export default function App() {
  return (
    <View style={styles.container}>
      {/* <ChatGPT /> */}
      {/* <HTMLContentDisplay /> */}
      <ProductDescription />
      {/* <ThreeDModelGenerator /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
