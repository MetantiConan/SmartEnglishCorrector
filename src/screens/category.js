import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const Category = ({ category, navigation }) => {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const data = { id: category.id };
    axios
      .post("https://asr.iiit.ac.in/chiranjeevi/voisserve/get/lessons", data)
      .then((res) => {
        setLessons(res.data.lessons);
      })
      .catch((err) => console.log(err.response));
  }, [category.id]);

  return (
    <View style={styles.container}>
      <ScrollView>
        {lessons.map((lesson, id) => (
          <TouchableOpacity
            key={lesson.id}
            style={styles.category}
            onPress={() => navigation.navigate("Lesson", lesson.id)}
          >
            <Text style={styles.text}>Lesson {id + 1}</Text>
            <View style={styles.line} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  category: {
    backgroundColor: "#fff",
    marginVertical: 10,
    marginHorizontal: 20,
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
export default Category;
