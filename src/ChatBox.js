// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   Button,
//   TextInput,
//   ScrollView,
//   StyleSheet,
// } from "react-native";
// import axios from "axios";

// const ChatGPT = () => {
//   const [messages, setMessages] = useState([]);
//   const [inputMessage, setInputMessage] = useState("");

//   const OPENAI_API_KEY = "sk-LN7wU4UdCLWr5E1Ur"; // Replace this with your actual API key

//   const sendMessage = async () => {
//     if (!inputMessage.trim()) return;

//     const requestData = {
//       model: "gpt-4-turbo-preview",
//       messages: [...messages, { role: "user", content: inputMessage.trim() }],
//       temperature: 0.7,
//     };

//     try {
//       const response = await axios.post(
//         "https://api.openai.com/v1/chat/completions",
//         requestData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${OPENAI_API_KEY}`,
//           },
//         }
//       );

//       console.log(response);
//       const responseData = response.data.choices[0].message.content;

//       setMessages([...messages, { role: "assistant", content: responseData }]);
//       setInputMessage("");
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <ScrollView contentContainerStyle={styles.messagesContainer}>
//         {messages.map((message, index) => (
//           <View
//             key={index}
//             style={[
//               styles.message,
//               message.role === "user"
//                 ? styles.userMessage
//                 : styles.assistantMessage,
//             ]}
//           >
//             <Text style={styles.messageText}>{message.content}</Text>
//           </View>
//         ))}
//       </ScrollView>
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.textInput}
//           value={inputMessage}
//           onChangeText={(text) => setInputMessage(text)}
//           placeholder="Type your message..."
//           onSubmitEditing={sendMessage}
//         />
//         <Button title="Send" onPress={sendMessage} />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     justifyContent: "flex-end",
//   },
//   messagesContainer: {
//     flexGrow: 1,
//     justifyContent: "flex-end",
//   },
//   message: {
//     maxWidth: "70%",
//     marginVertical: 5,
//     padding: 10,
//     borderRadius: 10,
//   },
//   userMessage: {
//     alignSelf: "flex-end",
//     backgroundColor: "#dcf8c6",
//   },
//   assistantMessage: {
//     alignSelf: "flex-start",
//     backgroundColor: "#c7c7c7",
//   },
//   messageText: {
//     fontSize: 16,
//   },
//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 20,
//   },
//   textInput: {
//     flex: 1,
//     marginRight: 10,
//     padding: 10,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 10,
//   },
// });

// export default ChatGPT;

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

const ChatGPT = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const OPENAI_API_KEY = "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"; // Replace this with your actual API key

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const requestData = {
      model: "gpt-4-turbo-preview",
      messages: [...messages, { role: "user", content: inputMessage.trim() }],
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
        { role: "user", content: inputMessage.trim() },
        { role: "assistant", content: responseData },
      ]);
      setInputMessage("");
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
          value={inputMessage}
          onChangeText={(text) => setInputMessage(text)}
          placeholder="Type your message..."
          onSubmitEditing={sendMessage}
        />
        <Button title="Send" onPress={sendMessage} />
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
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  textInput: {
    flex: 1,
    marginRight: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
  },
});

export default ChatGPT;
