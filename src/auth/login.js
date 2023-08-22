import axios from "axios";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Input, NativeBaseProvider, Button, Icon } from "native-base";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import Loader from "./../utils/loader";

function Login() {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ email: "", password: "" });
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onLogin = async () => {
    if (validate()) {
      setLoading(true);
      axios
        .post("https://asr.iiit.ac.in/chiranjeevi/voisserve/post/login", user)
        .then(async (res) => {
          if (res.data.success) {
            await AsyncStorage.setItem("userId", res.data.user.id.toString());
            navigation.reset({
              index: 0,
              routes: [{ name: "Landing" }],
            });
          } else {
            setError({ email: "", password: "Failed to Login" });
          }

          setLoading(false);
        })
        .catch((error) => console.log(error));
    }
  };

  const validate = () => {
    let flag = true;
    let tempError = { email: "", password: "" };
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
    setError(tempError);
    return flag;
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <View style={styles.Middle}>
            <Text style={styles.LoginText}>Login</Text>
          </View>
          <View style={styles.text2}>
            <Text>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <Text style={styles.signupText}> Sign up</Text>
            </TouchableOpacity>
          </View>

          {/* Username or Email Input Field */}
          <View style={styles.buttonStyle}>
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
                placeholder="Email"
              />
              {error.email.length > 0 && (
                <Text style={styles.errorText}>{error.email}</Text>
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
                secureTextEntry={true}
                placeholder="Password"
              />
              {error.password.length > 0 && (
                <Text style={styles.errorText}>{error.password}</Text>
              )}
            </View>
          </View>

          <View style={styles.buttonStyle}>
            <Button
              style={styles.buttonDesign}
              onPress={() => {
                onLogin();
              }}
            >
              LOGIN
            </Button>
          </View>
        </>
      )}
    </View>
  );
}

export default () => {
  return (
    <NativeBaseProvider>
      <Login />
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
  },
  errorText: {
    marginTop: 4,
    color: "red",
    fontSize: 12,
  },
});
