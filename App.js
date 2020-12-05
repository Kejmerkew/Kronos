import React, { useState } from "react";
import { LogBox } from "react-native";

import AuthNavigator from "./app/navigation/AuthNavigator";
import AppNavigator from "./app/navigation/AppNavigator";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { navigationRef } from "./app/navigation/rootNavigation";
import navigationTheme from "./app/navigation/navigationTheme";
import AuthContext from "./app/auth/context";

import { AppLoading } from "expo";

LogBox.ignoreLogs([
  "Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`",
]);

LogBox.ignoreLogs([
  "Warning: componentWillReceiveProps has been renamed, and is not recommended for use. See https://fb.me/react-unsafe-component-lifecycles for details.",
]);

export default function App() {
  const [User, setUser] = useState();
  const [masterKey, setMasterKey] = useState();
  const [isReady, setIsReady] = useState(false);
  // asyncApi.clearAll();

  const restoreUser = async () => {
    if (User) setUser(User);
    if (masterKey) setMasterKey(masterKey);
  };

  if (!isReady) {
    return (
      <AppLoading startAsync={restoreUser} onFinish={() => setIsReady(true)} />
    );
  }

  return (
    <AuthContext.Provider value={{ User, setUser, masterKey, setMasterKey }}>
      <NavigationContainer ref={navigationRef} theme={navigationTheme}>
        {User ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
