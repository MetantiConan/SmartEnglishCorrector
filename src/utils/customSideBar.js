import React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { MaterialIcons } from "@expo/vector-icons";

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";

const CustomSidebarMenu = (props) => {
  const BASE_PATH =
    "https://raw.githubusercontent.com/AboutReact/sampleresource/master/";
  const proileImage = "react_logo.png";
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/*Top Large Image */}
      <Image
        source={{ uri: BASE_PATH + proileImage }}
        style={styles.sideMenuProfileIcon}
      />
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="About ProCorrector"
          onPress={() => Linking.openURL("https://aboutreact.com/")}
        />
        <View style={styles.customItem}>
          <MaterialIcons name="logout" size={24} color="black" />
          <Text
            onPress={async () => {
              AsyncStorage.clear();
              navigation.reset({
                index: 0,
                routes: [{ name: "Login" }],
              });
            }}
          >
            Logout
          </Text>
        </View>
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    marginTop: 30,
    resizeMode: "center",
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: "center",
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default CustomSidebarMenu;
