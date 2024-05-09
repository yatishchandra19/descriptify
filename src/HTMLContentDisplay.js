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
        const response = await axios.get(
          "https://www.flipkart.com/motorola-g04-satin-blue-128-gb/p/itm723b134b6121c?pid=MOBGUFK4DNFX5BFV&lid=LSTMOBGUFK4DNFX5BFVR3WXGI&marketplace=FLIPKART&store=tyy%2F4io&srno=b_1_1&otracker=clp_bannerads_1_9.bannerAdCard.BANNERADS_Moto-G04-PL-EB-sale%2BOn_mobile-phones-store_JT3BQQZ9E1H4&fm=organic&iid=50d7cae3-91b3-481a-b72f-75a116c28abb.MOBGUFK4DNFX5BFV.SEARCH&ppt=clp&ppn=mobile-phones-store&ssid=80ukwdebds0000001708606472146"
        ); // Replace with the URL of the webpage you want to fetch
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
