import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import capitalizeFirstLetter from "../utils/helper";

const Home = ({ categories, navigation }) => {
  return (
    <View style={styles.container}>
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={styles.category}
          onPress={() => navigation.navigate(category.type)}
        >
          <Text style={styles.text}>
            Learn {capitalizeFirstLetter(category.type)} Pronounciation
          </Text>
          <View style={styles.line} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  category: {
    backgroundColor: "#fff",
    marginVertical: 10,
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  line: {
    backgroundColor: "#D3D3D3",
    height: 3,
    marginTop: 15,
  },
  text: {
    fontWeight: "bold",
    color: "grey",
  },
});

export default Home;
