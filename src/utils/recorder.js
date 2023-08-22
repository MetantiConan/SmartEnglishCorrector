import React, { useState, useRef, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Audio } from "expo-av";
import moment from "moment";
import { LinearGradient } from "expo-linear-gradient";

import { Input, Slider, IconButton } from "native-base";
import { Icon } from "react-native-gradient-icon";

import { FontAwesome5 } from "@expo/vector-icons";
import Filler from "./filler";

export default function Recorder({ text }) {
  const AudioRecorder = useRef(new Audio.Recording());
  const AudioPlayer = useRef(new Audio.Sound());

  // States for UI
  const [RecordedURI, SetRecordedURI] = useState("");
  const [AudioPermission, SetAudioPermission] = useState(false);
  const [IsRecording, SetIsRecording] = useState(false);
  const [IsPLaying, SetIsPLaying] = useState(false);
  const [recorded, setRecorded] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [results, setResults] = useState(false);

  // Initial Load to get the audio permission
  useEffect(() => {
    GetPermission();
  }, []);

  // Function to get the audio permission
  const GetPermission = async () => {
    const getAudioPerm = await Audio.requestPermissionsAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });
    SetAudioPermission(getAudioPerm.granted);
  };

  // Function to start recording
  const StartRecording = async () => {
    try {
      // Check if user has given the permission to record
      if (AudioPermission === true) {
        try {
          // Prepare the Audio Recorder
          await AudioRecorder.current.prepareToRecordAsync({
            isMeteringEnabled: true,
            android: {
              extension: ".m4a",
              outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
              audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
              sampleRate: 44100,
              numberOfChannels: 2,
              bitRate: 128000,
            },
            ios: {
              extension: ".wav",
              audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MEDIUM,
              sampleRate: 44100,
              numberOfChannels: 2,
              bitRate: 128000,
            },
          });

          // Start recording
          await AudioRecorder.current.startAsync();
          setStartTime(new Date().getTime());
          SetIsRecording(true);
        } catch (error) {
          console.log(error);
        }
      } else {
        // If user has not given the permission to record, then ask for permission
        GetPermission();
      }
    } catch (error) {}
  };

  // Function to stop recording
  const StopRecording = async () => {
    try {
      // Stop recording
      await AudioRecorder.current.stopAndUnloadAsync();

      // Get the recorded URI here
      const result = AudioRecorder.current.getURI();
      if (result) SetRecordedURI(result);
      console.log(result);

      // Reset the Audio Recorder
      AudioRecorder.current = new Audio.Recording();
      setDuration(new Date().getTime() - startTime);
      SetIsRecording(false);
      setRecorded(true);
    } catch (error) {}
  };

  // Function to play the recorded audio
  const PlayRecordedAudio = async () => {
    try {
      // Load the Recorded URI
      await AudioPlayer.current.loadAsync({ uri: RecordedURI }, {}, true);

      // Get Player Status
      const playerStatus = await AudioPlayer.current.getStatusAsync();

      // Play if song is loaded successfully
      if (playerStatus.isLoaded) {
        if (playerStatus.isPlaying === false) {
          AudioPlayer.current.playAsync();
          SetIsPLaying(true);
        }
      }
    } catch (error) {}
  };

  // Function to stop the playing audio
  const StopPlaying = async () => {
    try {
      //Get Player Status
      const playerStatus = await AudioPlayer.current.getStatusAsync();

      // If song is playing then stop it
      if (playerStatus.isLoaded === true)
        await AudioPlayer.current.unloadAsync();

      SetIsPLaying(false);
    } catch (error) {}
  };

  return (
    <View style={styles.question}>
      {results ? (
        <>
          <View style={styles.questionHeader}>
            <Text style={styles.questionText}>{text.pattern}</Text>
          </View>
          <View style={styles.ratingComponent}>
            <View>
              <Icon
                size={50}
                colors={[
                  { color: "green", offset: "0", opacity: "1" },
                  { color: "white", offset: "0.6", opacity: "1" },
                ]}
                name="star"
                type="font-awesome"
              />
              <Text style={styles.headingTextSlider}>0.6</Text>
            </View>
            <Filler filled={true} text="jhow" value="1.00" />
            <Filler filled={true} text="asdf" value="1.00" />
            <Filler filled={false} text="b iy" value="0.00" />
            <Filler filled={true} text="s uw n" value="1.00" />
          </View>
          <Text style={styles.headingTextSlider}>You Speak</Text>
          <View style={styles.questionFooter}>
            <IconButton
              _icon={{
                as: FontAwesome5,
                name: IsPLaying ? "pause" : "play-circle",
                size: 6,
              }}
              onPress={IsPLaying ? StopPlaying : PlayRecordedAudio}
              style={{ marginRight: 15 }}
            />
            <Slider
              maxW="230"
              defaultValue={0}
              minValue={0}
              maxValue={duration}
            >
              <Slider.Track>
                <Slider.FilledTrack />
              </Slider.Track>
              <Slider.Thumb />
            </Slider>
            <Text style={styles.timerText}>
              {moment(Math.trunc(duration - 19800000, "milliseconds")).format(
                "mm:ss"
              )}
            </Text>
          </View>
          <Text style={styles.headingTextSlider}>Expert Speak</Text>
          <View style={styles.questionFooter}>
            <IconButton
              _icon={{
                as: FontAwesome5,
                name: IsPLaying ? "pause" : "play-circle",
                size: 6,
              }}
              onPress={IsPLaying ? StopPlaying : PlayRecordedAudio}
              style={{ marginRight: 15 }}
            />
            <Slider
              maxW="230"
              defaultValue={0}
              minValue={0}
              maxValue={duration}
            >
              <Slider.Track>
                <Slider.FilledTrack />
              </Slider.Track>
              <Slider.Thumb />
            </Slider>
            <Text style={styles.timerText}>
              {moment(Math.trunc(duration - 19800000, "milliseconds")).format(
                "mm:ss"
              )}
            </Text>
          </View>
        </>
      ) : (
        <>
          <View style={styles.questionHeader}>
            <IconButton
              _icon={{ as: FontAwesome5, name: "microphone", size: 6 }}
              colorScheme="green"
              onPress={IsRecording ? StopRecording : StartRecording}
            />
            <Text style={styles.questionText}>{text.pattern}</Text>
          </View>
          {recorded && (
            <View style={styles.questionFooter}>
              <IconButton
                _icon={{
                  as: FontAwesome5,
                  name: IsPLaying ? "pause" : "play-circle",
                  size: 6,
                }}
                onPress={IsPLaying ? StopPlaying : PlayRecordedAudio}
                style={{ marginRight: 15 }}
              />
              <Slider
                maxW="230"
                defaultValue={0}
                minValue={0}
                maxValue={duration}
              >
                <Slider.Track>
                  <Slider.FilledTrack />
                </Slider.Track>
                <Slider.Thumb />
              </Slider>
              <Text style={styles.timerText}>
                {moment(Math.trunc(duration - 19800000, "milliseconds")).format(
                  "mm:ss"
                )}
              </Text>
            </View>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  question: {
    justifyContent: "space-around",
    backgroundColor: "white",
    marginVertical: 10,
    padding: 7,
  },
  questionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  questionFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ratingComponent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 20,
  },
  questionText: {
    marginLeft: 10,
    fontWeight: "bold",
    fontSize: 20,
  },
  headingTextSlider: {
    marginLeft: 10,
  },
  linearGradient: {
    height: 30,
    width: 30,
  },
});
