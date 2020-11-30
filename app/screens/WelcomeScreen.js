import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import AppButton from "../components/AppButton";

import Screen from "../components/Screen";
import colors from "../config/colors";
import routes from "../navigation/routes";

function WelcomeScreen({ navigation }) {
  return (
    <Screen style={styles.screen}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../assets/symbol.png")} />
        <Text style={styles.tagline}>KRONOS</Text>
        <Text style={styles.tagline2}>Offline Password Manager</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <AppButton
          title="Login"
          color="dark"
          textColor="primary"
          onPress={() => navigation.navigate(routes.LOGIN)}
        />
        <AppButton
          title="Register"
          color="dark"
          textColor="secondary"
          onPress={() => navigation.navigate(routes.REGISTER)}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  buttonsContainer: {
    padding: 20,
    width: "100%",
  },
  logo: {
    width: 200,
    height: 100,
  },
  logoContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
  },
  screen: {
    alignItems: "center",
    alignSelf: "stretch",
    backgroundColor: colors.light,
    flex: 1,
    justifyContent: "flex-end",
  },
  tagline: {
    fontSize: 25,
    fontWeight: "600",
    paddingVertical: 20,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
  tagline2: {
    fontSize: 25,
    fontWeight: "600",
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
});

export default WelcomeScreen;
