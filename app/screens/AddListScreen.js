import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Screen from "../components/Screen";
import ListComponent from "../components/ListComponent";
import database from "../db/database";
import AuthContext from "../auth/context";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(1).label("Name"),
  url: Yup.string().optional().max(10000).label("URL"),
  notes: Yup.string().label("Notes"),
  username: Yup.string().required().label("Username"),
  password: Yup.string().required().label("Password"),
});

function AddListScreen({ navigation }) {
  const { masterKey } = useContext(AuthContext);

  const handleSubmit = (listing) => {
    database.addListing({ ...listing }, masterKey);

    navigation.reset({
      index: 0,
      routes: [{ name: "Passwords" }],
    });
  };

  return (
    <KeyboardAwareScrollView>
      <Screen style={styles.screen}>
        {/*Upload screen */}

        <ListComponent
          initialValues={{
            name: "",
            url: "",
            username: "",
            password: "",
            notes: "",
          }}
          onSubmit={handleSubmit}
          text="Add Password"
          validationSchema={validationSchema}
          buttonColor="dark"
          buttonTitle="Add"
        />
      </Screen>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 10,
  },
});

export default AddListScreen;
