import axios from "axios";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import { Input, NativeBaseProvider, Button, Icon } from "native-base";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import Loader from "./../utils/loader";

function Signup() {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({
    name: "",
    password: "",
    confirmPassword: "",
    email: "",
    age: "",
    education: "",
    gender: "",
    mediumofeducation: "",
    nativelanguage: "",
  });
  const [error, setError] = useState({
    name: "",
    password: "",
    confirmPassword: "",
    email: "",
    age: "",
    education: "",
    gender: "",
    mediumofeducation: "",
    nativelanguage: "",
  });

  const onRegister = async () => {
    if (validate()) {
      setLoading(true);
      axios
        .post(
          "https://asr.iiit.ac.in/chiranjeevi/voisserve/post/register",
          user
        )
        .then(async (res) => {
          if (res.data.success) {
            await AsyncStorage.setItem("userId", res.data.id.toString());
            navigation.reset({
              index: 0,
              routes: [{ name: "Landing" }],
            });
          } else {
            setError({ ...error, email: res.data.message });
          }

          setLoading(false);
        })
        .catch((error) => console.log(error.response.data));
    }
  };

  const validate = () => {
    let flag = true;
    let tempError = {
      name: "",
      password: "",
      confirmPassword: "",
      email: "",
      age: "",
      education: "",
      gender: "",
      mediumofeducation: "",
      nativelanguage: "",
    };

    if (user.name == "") {
      tempError = { ...tempError, name: "Name is required." };
      flag = false;
    } else {
      tempError = { ...tempError, name: "" };
    }

    if (user.email == "") {
      tempError = { ...tempError, email: "Email is required." };
      flag = false;
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email)
    ) {
      tempError = { ...tempError, email: "Invalid Email" };
      flag = false;
    } else {
      tempError = { ...tempError, email: "" };
    }

    if (!user.age) {
      tempError = { ...tempError, age: "Age is required." };
      flag = false;
    } else if (user.age < 0) {
      tempError = { ...tempError, age: "Invalid age" };
      flag = false;
    } else {
      tempError = { ...tempError, age: "" };
    }

    if (user.education == "") {
      tempError = { ...tempError, education: "Education is required." };
      flag = false;
    } else {
      tempError = { ...tempError, education: "" };
    }

    if (user.gender == "") {
      tempError = { ...tempError, gender: "Gender is required." };
      flag = false;
    } else {
      tempError = { ...tempError, gender: "" };
    }

    if (user.mediumofeducation == "") {
      tempError = { ...tempError, mediumofeducation: "Medium is required." };
      flag = false;
    } else {
      tempError = { ...tempError, mediumofeducation: "" };
    }

    if (user.nativelanguage == "") {
      tempError = { ...tempError, nativelanguage: "Medium is required." };
      flag = false;
    } else {
      tempError = { ...tempError, nativelanguage: "" };
    }

    if (user.password == "") {
      tempError = { ...tempError, password: "Password is required." };
      flag = false;
    } else if (user.password.length < 6) {
      tempError = {
        ...tempError,
        password: "Password should contain minimum 6 character.",
      };
      flag = false;
    } else {
      tempError = { ...tempError, password: "" };
    }

    if (user.confirmPassword !== user.password) {
      tempError = { ...tempError, confirmPassword: "Passwords do not match." };
      flag = false;
    } else {
      tempError = { ...tempError, confirmPassword: "" };
    }

    setError(tempError);
    return flag;
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <ScrollView style={styles.scrollcontainer}>
            <View style={styles.Middle}>
              <Text style={styles.LoginText}>Signup</Text>
            </View>
            <View style={styles.text2}>
              <Text>Already have account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.signupText}> Login </Text>
              </TouchableOpacity>
            </View>

            {/* Username or Email Input Field */}
            <View style={styles.buttonStyle}>
              <View style={styles.emailInput}>
                <Input
                  InputLeftElement={
                    <Icon
                      as={<FontAwesome5 name="user-secret" />}
                      size="sm"
                      m={2}
                    />
                  }
                  value={user.name}
                  onChangeText={(text) => setUser({ ...user, name: text })}
                  variant="outline"
                  returnKeyType="next"
                  placeholder="Name"
                />
                {error.name.length > 0 && (
                  <Text style={styles.errorText}>{error.name}</Text>
                )}
              </View>
            </View>

            {/* Username or Email Input Field */}
            <View style={styles.buttonStyleX}>
              <View style={styles.emailInput}>
                <Input
                  InputLeftElement={
                    <Icon
                      as={<MaterialCommunityIcons name="email" />}
                      size="sm"
                      m={2}
                    />
                  }
                  keyboardType="email-address"
                  value={user.email}
                  onChangeText={(text) => setUser({ ...user, email: text })}
                  variant="outline"
                  returnKeyType="next"
                  placeholder="Email"
                />
                {error.email.length > 0 && (
                  <Text style={styles.errorText}>{error.email}</Text>
                )}
              </View>
            </View>

            {/* Age Input Field */}
            <View style={styles.buttonStyleX}>
              <View style={styles.emailInput}>
                <Input
                  InputLeftElement={
                    <Icon
                      as={<MaterialCommunityIcons name="numeric" />}
                      size="sm"
                      m={2}
                    />
                  }
                  keyboardType={
                    Platform.OS === "ios" ? "number-pad" : "numeric"
                  }
                  value={user.age}
                  onChangeText={(text) => setUser({ ...user, age: text })}
                  variant="outline"
                  returnKeyType="next"
                  placeholder="Age"
                />
                {error.age.length > 0 && (
                  <Text style={styles.errorText}>{error.age}</Text>
                )}
              </View>
            </View>

            {/* Edcuation Input Field */}
            <View style={styles.buttonStyleX}>
              <View style={styles.emailInput}>
                <Input
                  InputLeftElement={
                    <Icon
                      as={<MaterialCommunityIcons name="book-education" />}
                      size="sm"
                      m={2}
                    />
                  }
                  value={user.education}
                  onChangeText={(text) => setUser({ ...user, education: text })}
                  variant="outline"
                  returnKeyType="next"
                  placeholder="Education"
                />
                {error.education.length > 0 && (
                  <Text style={styles.errorText}>{error.education}</Text>
                )}
              </View>
            </View>

            {/* Gender Input Field */}
            <View style={styles.buttonStyleX}>
              <View style={styles.emailInput}>
                <Input
                  InputLeftElement={
                    <Icon
                      as={<MaterialCommunityIcons name="gender-male-female" />}
                      size="sm"
                      m={2}
                    />
                  }
                  value={user.gender}
                  onChangeText={(text) => setUser({ ...user, gender: text })}
                  variant="outline"
                  returnKeyType="next"
                  placeholder="Gender"
                />
                {error.gender.length > 0 && (
                  <Text style={styles.errorText}>{error.gender}</Text>
                )}
              </View>
            </View>

            {/* Medium Of Edcuation Input Field */}
            <View style={styles.buttonStyleX}>
              <View style={styles.emailInput}>
                <Input
                  InputLeftElement={
                    <Icon
                      as={<MaterialCommunityIcons name="book-education" />}
                      size="sm"
                      m={2}
                    />
                  }
                  value={user.mediumofeducation}
                  onChangeText={(text) =>
                    setUser({ ...user, mediumofeducation: text })
                  }
                  variant="outline"
                  returnKeyType="next"
                  placeholder="Medium of Education"
                />
                {error.mediumofeducation.length > 0 && (
                  <Text style={styles.errorText}>
                    {error.mediumofeducation}
                  </Text>
                )}
              </View>
            </View>

            {/* Native Language Input Field */}
            <View style={styles.buttonStyleX}>
              <View style={styles.emailInput}>
                <Input
                  InputLeftElement={
                    <Icon
                      as={<FontAwesome5 name="language" />}
                      size="sm"
                      m={2}
                    />
                  }
                  value={user.nativelanguage}
                  onChangeText={(text) =>
                    setUser({ ...user, nativelanguage: text })
                  }
                  variant="outline"
                  returnKeyType="next"
                  placeholder="Native Language"
                />
                {error.nativelanguage.length > 0 && (
                  <Text style={styles.errorText}>{error.nativelanguage}</Text>
                )}
              </View>
            </View>

            {/* Password Input Field */}
            <View style={styles.buttonStyleX}>
              <View style={styles.emailInput}>
                <Input
                  InputLeftElement={
                    <Icon as={<FontAwesome5 name="key" />} size="sm" m={2} />
                  }
                  value={user.password}
                  onChangeText={(text) => setUser({ ...user, password: text })}
                  variant="outline"
                  returnKeyType="next"
                  secureTextEntry={true}
                  placeholder="Password"
                />
                {error.password.length > 0 && (
                  <Text style={styles.errorText}>{error.password}</Text>
                )}
              </View>
            </View>

            {/* Password Input Field */}
            <View style={styles.buttonStyleX}>
              <View style={styles.emailInput}>
                <Input
                  InputLeftElement={
                    <Icon as={<FontAwesome5 name="key" />} size="sm" m={2} />
                  }
                  value={user.confirmPassword}
                  onChangeText={(text) =>
                    setUser({ ...user, confirmPassword: text })
                  }
                  variant="outline"
                  returnKeyType="next"
                  secureTextEntry={true}
                  placeholder="Confirm Password"
                />
                {error.confirmPassword.length > 0 && (
                  <Text style={styles.errorText}>{error.confirmPassword}</Text>
                )}
              </View>
            </View>

            {/* Button */}
            <View style={styles.buttonStyle}>
              <Button style={styles.buttonDesign} onPress={() => onRegister()}>
                REGISTER NOW
              </Button>
            </View>

            <StatusBar style="auto" />
          </ScrollView>
        </>
      )}
    </View>
  );
}

export default () => {
  return (
    <NativeBaseProvider>
      <Signup />
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollcontainer: {
    flex: 1,
  },
  LoginText: {
    marginTop: 100,
    fontSize: 30,
    fontWeight: "bold",
  },
  Middle: {
    alignItems: "center",
    justifyContent: "center",
  },
  text2: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 5,
  },
  signupText: {
    fontWeight: "bold",
  },
  emailField: {
    marginTop: 30,
    marginLeft: 15,
  },
  emailInput: {
    marginTop: 10,
    marginRight: 5,
  },
  buttonStyle: {
    marginTop: 30,
    marginLeft: 15,
    marginRight: 15,
  },
  buttonStyleX: {
    marginTop: 12,
    marginLeft: 15,
    marginRight: 15,
  },
  buttonDesign: {
    backgroundColor: "#026efd",
    marginBottom: 50,
  },
  lineStyle: {
    flexDirection: "row",
    marginTop: 30,
    marginLeft: 15,
    marginRight: 15,
    alignItems: "center",
  },
  imageStyle: {
    width: 80,
    height: 80,
    marginLeft: 20,
  },
  boxStyle: {
    flexDirection: "row",
    marginTop: 30,
    marginLeft: 15,
    marginRight: 15,
    justifyContent: "space-around",
  },
  errorText: {
    marginTop: 4,
    color: "red",
    fontSize: 12,
  },
});
