import React, { useContext } from "react";
import { Image, StyleSheet } from "react-native";
import * as Yup from "yup";

import {
  AppForm,
  AppFormField,
  ErrorMessage,
  SubmitButton,
} from "../components/forms";
import Screen from "../components/Screen";
import LoginUser from "../auth/login";
import routes from "../navigation/routes";
import AuthContext from "../auth/context";

const validationSchema = Yup.object().shape({
  username: Yup.string().required().label("Username"),
  password: Yup.string().required().min(4).label("Password"),
});

function LoginScreen({ navigation }) {
  const { User, setUser } = useContext(AuthContext);

  const handleSubmit = async (user) => {
    const validate = await LoginUser.loginUser(user);

    if (validate) {
      console.log("Correct!");
      //autheticate
      setUser(user.username);
    } else {
      console.log("Invalid username and/or password!");
    }
  };

  return (
    <Screen style={styles.container}>
      <Image style={styles.logo} source={require("../assets/symbol.png")} />
      <AppForm
        initialValues={{ username: "", password: "" }}
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
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        <SubmitButton title="Login" color="dark" textColor="danger" />
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

export default LoginScreen;
