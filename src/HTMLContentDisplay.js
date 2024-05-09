import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import axios from "axios";
import cheerio from "cheerio";

const HTMLContentDisplay = () => {
  const [htmlContent, setHtmlContent] = useState("");
  const [extractedText, setExtractedText] = useState("");

  useEffect(() => {
    const fetchHTMLContent = async () => {
      try {
        const response = await axios.get(""); // Replace with the URL of the webpage you want to fetch
        setHtmlContent(response.data);
      } catch (error) {
        console.error("Error fetching HTML:", error);
      }
    };

    fetchHTMLContent();
  }, []);

  useEffect(() => {
    if (htmlContent) {
      const $ = cheerio.load(htmlContent);
      const text = $("body").text();
      setExtractedText(text);
    }
  }, [htmlContent]);

  return (
    <ScrollView>
      <Text>Extracted Text:</Text>
      <Text>{extractedText}</Text>
      {/* <Text>{htmlContent}</Text>  */}
    </ScrollView>
  );
};

export default HTMLContentDisplay;
