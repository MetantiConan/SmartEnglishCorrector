import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { Button } from "native-base";

import Recorder from "../utils/recorder";

const mapping = {
  1: "phenome",
  2: "stress",
  3: "intonation",
  4: "sentence",
};

const Lesson = ({ route, navigation }) => {
  const [loading, setLoading] = useState(true);

  const [questions, setQuestions] = useState({});
  const [selectedQuestion, setSelectedQuestion] = useState({});
  const [audioFiles, setAudioFiles] = useState([]);

  useEffect(() => {
    const data = { id: route.params };
    axios
      .post("https://asr.iiit.ac.in/chiranjeevi/voisserve/get/questions", data)
      .then((res) => {
        setQuestions(res.data.questions);
        setSelectedQuestion(Object.keys(res.data.questions)[0]);
        setLoading(false);
      })
      .catch((err) => console.log(err.response));
  }, [route.params]);

  const onSubmit = () => {
    var data = new FormData();
    data.append("cattype", mapping[route.params]);
    data.append("mode", "submitrecording");
    let ids = [];
    questions[selectedQuestion].forEach((text) => {
      ids.push(text.id);
    });
    data.append("id", ids);
  };

  return (
    <View style={styles.container}>
      {!loading && (
        <>
          <View style={styles.lessonContainer}>
            <View style={styles.lessonHeader}>
              <Text>
                {selectedQuestion} of {Object.keys(questions).length}
              </Text>
              {questions[selectedQuestion].map((text) => (
                <Recorder
                  key={text.id}
                  text={text}
                  setAudioFiles={setAudioFiles}
                />
              ))}
            </View>
            <Button color="success.600" onPress={onSubmit}>
              SUBMIT
            </Button>
          </View>
          <ScrollView horizontal={true} style={styles.horContainter}>
            {Object.keys(questions).map((question) => {
              return (
                <TouchableOpacity
                  key={question}
                  style={styles.lesson}
                  onPress={() => setSelectedQuestion(question)}
                >
                  <Text
                    style={
                      question == selectedQuestion
                        ? styles.selectedLessonText
                        : styles.lessonText
                    }
                  >
                    {question}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#E5E4E2",
  },
  lessonContainer: {
    flex: 1,
  },
  lessonHeader: {
    justifyConent: "space-between",
  },
  horContainter: {
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 5,
    marginLeft: 5,
  },
  lesson: {
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    margin: 1,
    backgroundColor: "#71797E",
  },
  lessonText: {
    color: "white",
  },
  selectedLessonText: {
    color: "white",
    fontWeight: "bold",
    textDecorationLine: "underline",
    fontSize: 18,
  },
});

export default Lesson;
