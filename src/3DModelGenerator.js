// import React, { useState } from "react";
// import { View, Button, Image, TextInput, StyleSheet } from "react-native";
// import axios from "axios";

// const OpenAIImageGenerationComponent = () => {
//   const [prompt, setPrompt] = useState("");
//   const [generatedImages, setGeneratedImages] = useState([]);

//   const handleImageGeneration = async () => {
//     const apiKey = "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";

//     try {
//       const response = await axios.post(
//         "https://api.openai.com/v1/images/generations",
//         {
//           // image: ,
//           prompt: prompt,
//           model: "dall-e-2", // Adjust the model as needed
//           n: 1, // Number of images to generate
//           quality: "standard", // Adjust quality as needed
//           response_format: "url", // Return format
//           size: "1024x1024", // Adjust size as needed
//           style: "vivid", // Adjust style as needed
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${apiKey}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       setGeneratedImages(response.data.data);
//     } catch (error) {
//       console.error("Error generating images:", error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter prompt for image generation"
//         value={prompt}
//         onChangeText={(text) => setPrompt(text)}
//       />
//       <Button title="Generate Image" onPress={handleImageGeneration} />
//       {generatedImages.map((image, index) => (
//         <Image key={index} source={{ uri: image.url }} style={styles.image} />
//       ))}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 20,
//   },
//   image: {
//     width: 300,
//     height: 300,
//     marginVertical: 20,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "gray",
//     padding: 10,
//     marginBottom: 20,
//     width: "100%",
//   },
// });

// export default OpenAIImageGenerationComponent;

import React, { useState } from "react";
import { View, Button, Image, TextInput, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
// import RNFS from "react-native-fs";

import axios from "axios";

const OpenAIImageGenerationComponent = () => {
  const [prompt, setPrompt] = useState("");
  const [generatedImages, setGeneratedImages] = useState([]);

  const handleImageLibraryLaunch = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // base64: true,
      // allowsEditing: true,
      // aspect: [4, 3],
      // quality: 1,
    });

    console.log(result.assets);

    console.log("thus is the resutttttt" + result.assets[0].uri);

    if (!result.canceled) {
      // const imageBase64 = await RNFS.readFile(result.assets[0].uri, "base64");
      handleImageGeneration(result.assets[0].uri);
    }
  };

  const handleImageGeneration = async (selectedImage) => {
    console.log(selectedImage);
    const apiKey = "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";

    try {
      const response = await axios.post(
        // "https://api.openai.com/v1/images/generations"
        "https://api.openai.com/v1/images/variations",
        {
          image: selectedImage,
          // prompt: prompt,
          model: "dall-e-2",
          n: 2,
          // quality: "standard",
          response_format: "url",
          size: "1024x1024",
          // style: "vivid",
        },

        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      setGeneratedImages(response.data.data);
    } catch (error) {
      console.error("Error generating images:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* <TextInput
        style={styles.input}
        placeholder="Enter prompt for image generation"
        value={prompt}
        onChangeText={(text) => setPrompt(text)}
      /> */}
      <Button title="Select Image" onPress={handleImageLibraryLaunch} />
      {generatedImages.map((image, index) => (
        <Image key={index} source={{ uri: image.url }} style={styles.image} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginVertical: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginBottom: 20,
    width: "100%",
  },
});

export default OpenAIImageGenerationComponent;
