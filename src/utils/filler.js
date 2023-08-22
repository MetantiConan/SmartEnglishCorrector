import React from "react";
import { View, Text } from "react-native";

function Filler({ filled, text, value }) {
  return (
    <View>
      <Text>{value}</Text>
      <View
        style={{
          borderWidth: "1px",
          borderRadius: 5,
          margin: 3,
          height: 25,
          width: 25,
          backgroundColor: filled ? "black" : "white",
        }}
      ></View>
      <Text>{text}</Text>
    </View>
  );
}

export default Filler;
