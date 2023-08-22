import axios from "axios";
import React, { useState, useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import CategoryRouter from "./categoryRouter";
import Lesson from "./lesson";
import Home from "./home";

import CustomSidebarMenu from "../utils/customSideBar";

const Drawer = createDrawerNavigator();

export default function App() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("https://asr.iiit.ac.in/chiranjeevi/voisserve/get/categories")
      .then((res) => {
        setCategories(res.data.categories);
      })
      .catch((err) => console.log(err.response));
  }, []);

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomSidebarMenu {...props} />}
    >
      <Drawer.Screen name="Home">
        {(props) => <Home {...props} categories={categories} />}
      </Drawer.Screen>
      <Drawer.Screen
        name="Lesson"
        component={Lesson}
        options={{
          drawerItemStyle: { height: 0 },
        }}
      />
      {categories.length > 0 &&
        categories.map((category) => (
          <Drawer.Screen key={category.id} name={category.type}>
            {(props) => <CategoryRouter {...props} category={category} />}
          </Drawer.Screen>
        ))}
    </Drawer.Navigator>
  );
}
