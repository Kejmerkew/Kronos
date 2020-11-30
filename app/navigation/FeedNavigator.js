import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import ViewListingScreen from "../screens/ViewListingScreen";
import AddListScreen from "../screens/AddListScreen";

const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Passwords" component={HomeScreen} />
    <Stack.Screen name="View" component={ViewListingScreen} />
    <Stack.Screen name="Add" component={AddListScreen} />
  </Stack.Navigator>
);

export default FeedNavigator;
