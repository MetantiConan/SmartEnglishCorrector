import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import Login from "./src/auth/login";
import Signup from "./src/auth/signup";
import Landing from "./src/screens/router";

import { NativeBaseProvider } from "native-base";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

function App() {
  const [loading, setLoading] = useState(true);
  const [userFound, setUserFound] = useState(false);

  useEffect(() => {
    try {
      const getData = async () => {
        try {
          const value = await AsyncStorage.getItem("userId");
          if (value !== null) {
            setUserFound(true);
          }
        } catch (e) {}
      };
      getData();
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  }, []);
  return (
    <>
      {!loading && (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!userFound && <Stack.Screen name="Login" component={Login} />}
          {!userFound && <Stack.Screen name="Signup" component={Signup} />}
          <Stack.Screen name="Landing" component={Landing} />
        </Stack.Navigator>
      )}
    </>
  );
}

export default () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <App />
      </NavigationContainer>
    </NativeBaseProvider>
  );
};
