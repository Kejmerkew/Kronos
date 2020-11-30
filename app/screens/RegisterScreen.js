import React, { useContext, useState } from "react";
import { Image, StyleSheet } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import {
  AppForm,
  AppFormField,
  ErrorMessage,
  SubmitButton,
} from "../components/forms";
//import ActivityIndicator from "../components/ActivityIndicator";
import RegisterUser from "../auth/register";
import AuthContext from "../auth/context";

const validationSchema = Yup.object().shape({
  username: Yup.string().required().label("Username"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function RegisterScreen({ navigation }) {
  const { User, setUser } = useContext(AuthContext);

  const handleSubmit = async (user) => {
    const validate = await RegisterUser.registerUser(user);

    if (validate) {
      //autheticate
      setUser(user.username);
    }
  };

  return (
    //Activity Indicator

    <Screen style={styles.container}>
      <Image style={styles.logo} source={require("../assets/symbol.png")} />
      <AppForm
        initialValues={{ username: "", email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {/*Error message*/}
        <AppFormField
          autoCapitalize="words"
          autoCorrect={false}
          icon="account"
          keyboardType="default"
          name="username"
          placeholder="Username"
          textContentType="name"
        />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          name="email"
          placeholder="Email"
          textContentType="emailAddress"
        />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        <SubmitButton title="Register" color="dark" textColor="secondary" />
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    alignSelf: "center",
    height: 80,
    marginBottom: 20,
    marginTop: 50,
    width: 150,
  },
});

export default RegisterScreen;
