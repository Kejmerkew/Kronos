import React, { useContext, useState } from "react";
import { Image, StyleSheet } from "react-native";
import * as Yup from "yup";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

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
import Encrypt from "../auth/encryption";

const validationSchema = Yup.object().shape({
  username: Yup.string().required().label("Username"),
  password: Yup.string().required().min(4).label("Password"),
});

function LoginScreen({ navigation }) {
  const { User, setUser } = useContext(AuthContext);
  const { masterKey, setMasterKey } = useContext(AuthContext);
  const [visible, setVisible] = useState(false);

  const handleSubmit = async (user) => {
    const validate = await LoginUser.loginUser(user);

    if (validate) {
      //autheticated
      //set master key
      const hmacMain = Encrypt.encryptPBKDF2(user.username + user.password);
      const hmacKey = Encrypt.encryptSHA256(hmacMain);
      const hmac = Encrypt.encryptHMAC(hmacMain, hmacKey);
      setMasterKey(hmac);
      setUser(user.username);
    } else {
      setVisible(true);
    }
  };

  return (
    <KeyboardAwareScrollView>
      <Screen style={styles.container}>
        <Image style={styles.logo} source={require("../assets/symbol.png")} />
        <AppForm
          initialValues={{ username: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage
            error="Invalid username and/or password!"
            visible={visible}
          />
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
    </KeyboardAwareScrollView>
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
