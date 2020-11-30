import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { LogBox, StyleSheet, Text, View } from "react-native";

import ListComponent from "./app/components/ListComponent";
import AuthNavigator from "./app/navigation/AuthNavigator";
import AppNavigator from "./app/navigation/AppNavigator";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { navigationRef } from "./app/navigation/rootNavigation";
import navigationTheme from "./app/navigation/navigationTheme";
import AuthContext from "./app/auth/context";

import AccountScreen from "./app/screens/AccountScreen";
import AddListScreen from "./app/screens/AddListScreen";
import HomeScreen from "./app/screens/HomeScreen";
import LoginScreen from "./app/screens/LoginScreen";
import RegisterScreen from "./app/screens/RegisterScreen";
import ViewListingScreen from "./app/screens/ViewListingScreen";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import { AppLoading } from "expo";

LogBox.ignoreLogs([
  "Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`",
]);

LogBox.ignoreLogs([
  "Warning: componentWillReceiveProps has been renamed, and is not recommended for use. See https://fb.me/react-unsafe-component-lifecycles for details.",
]);

export default function App() {
  const [User, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  const restoreUser = async () => {
    if (User) setUser(User);
  };

  if (!isReady) {
    return (
      <AppLoading startAsync={restoreUser} onFinish={() => setIsReady(true)} />
    );
  }

  return (
    <AuthContext.Provider value={{ User, setUser }}>
      <NavigationContainer ref={navigationRef} theme={navigationTheme}>
        {User ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
