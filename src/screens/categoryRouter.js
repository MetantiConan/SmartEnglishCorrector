import axios from "axios";
import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Category from "./category";
import Lesson from "./lesson";
import Results from "./results";

const CategoryStack = createStackNavigator();

export default function CategoryRouter({ category }) {
  return (
    <CategoryStack.Navigator screenOptions={{ headerShown: false }}>
      <CategoryStack.Screen name="Category">
        {(props) => <Category {...props} category={category} />}
      </CategoryStack.Screen>
      <CategoryStack.Screen name="Lesson">
        {(props) => <Lesson {...props} />}
      </CategoryStack.Screen>
      <CategoryStack.Screen name="Results">
        {(props) => <Results {...props} />}
      </CategoryStack.Screen>
    </CategoryStack.Navigator>
  );
}
