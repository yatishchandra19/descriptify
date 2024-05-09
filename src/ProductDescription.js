import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";
import axios from "axios";

const ProductDescription = () => {
  const [messages, setMessages] = useState([]);
  const [productTitle, setProductTitle] = useState("");
  const [productDetails, setProductDetails] = useState("");

  const OPENAI_API_KEY = " "; // Replace this with your actual API key

  const generateProductDescription = async () => {
    if (!productTitle.trim() || !productDetails.trim()) return;

    const requestData = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Can you write a product description for shopify, based on the product title and product details. Title: "${productTitle}". Product Details: "${productDetails}". Make it short and perfect but include all the details`,
        },
      ],
      temperature: 0.7,
    };

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
        }
      );

      const responseData = response.data.choices[0].message.content;

      // Update messages state to include the new message
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: responseData },
      ]);

      // Clear product title and details
      setProductTitle("");
      setProductDetails("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.messagesContainer}>
        {messages.map((message, index) => (
          <View
            key={index}
            style={[
              styles.message,
              message.role === "user"
                ? styles.userMessage
                : styles.assistantMessage,
            ]}
          >
            <Text style={styles.messageText}>{message.content}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={productTitle}
          onChangeText={(text) => setProductTitle(text)}
          placeholder="Product Title"
        />
        <TextInput
          style={styles.textInput}
          value={productDetails}
          onChangeText={(text) => setProductDetails(text)}
          placeholder="Product Details"
          multiline
        />
        <Button
          title="Generate Description"
          onPress={generateProductDescription}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-end",
  },
  messagesContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  message: {
    maxWidth: "70%",
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#dcf8c6",
  },
  assistantMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#c7c7c7",
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "column",
    marginTop: 20,
  },
  textInput: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
  },
});

export default ProductDescription;
