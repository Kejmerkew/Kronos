import React, { useContext, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import ActionButton from "react-native-action-button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import colors from "../config/colors";
import { Clipboard } from "react-native";
import ListComponent from "../components/ListComponent";
import Screen from "../components/Screen";
import database from "../db/database";
import AuthContext from "../auth/context";

function ViewListingScreen({ route, navigation }) {
  const [showPass, setShowPass] = useState(true);
  const { masterKey } = useContext(AuthContext);
  const listing = route.params;
  const ID = listing.id;

  const handleSubmit = (listing) => {
    database.updateListing({ ...listing }, ID, masterKey);

    navigation.reset({
      index: 0,
      routes: [{ name: "Passwords" }],
    });
  };

  const handleDelete = () => {
    console.log(listing);

    Alert.alert(
      "Delete Password",
      "Are you sure you want to delete?",
      [
        {
          text: "OK",
          onPress: deleteItem,
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel pressed"),
        },
      ],
      { cancelable: false }
    );
  };

  const deleteItem = () => {
    database.deleteListing(ID);

    navigation.reset({
      index: 0,
      routes: [{ name: "Passwords" }],
    });
  };

  const copyToClipboard = () => {
    Clipboard.setString(listing.password);
  };

  return (
    <Screen style={styles.screen}>
      <KeyboardAwareScrollView>
        <ListComponent
          initialValues={{
            name: listing.name,
            url: listing.url,
            username: listing.username,
            password: listing.password,
            notes: listing.notes,
          }}
          onSubmit={handleSubmit}
          text="View/Edit Password"
          buttonColor="dark"
          buttonTitle="Done"
          secureTextEntry={showPass}
        />
      </KeyboardAwareScrollView>
      <ActionButton
        autoInactive={false}
        buttonColor={colors.dark}
        renderIcon={(active) =>
          active ? (
            <MaterialCommunityIcons
              name="dots-horizontal"
              size={24}
              color="white"
            />
          ) : (
            <MaterialCommunityIcons
              name="dots-horizontal"
              size={24}
              color="white"
            />
          )
        }
      >
        <ActionButton.Item
          title="Delete"
          buttonColor={colors.delete}
          onPress={handleDelete}
        >
          <MaterialCommunityIcons name="delete" color="white" size={25} />
        </ActionButton.Item>

        <ActionButton.Item
          title="Show Password"
          buttonColor={colors.show}
          onPress={() => (showPass ? setShowPass(false) : setShowPass(true))}
        >
          <FontAwesome5 name="unlock" color="white" size={25} />
        </ActionButton.Item>

        <ActionButton.Item
          title="Copy Password"
          buttonColor={colors.copy}
          onPress={copyToClipboard}
        >
          <FontAwesome5 name="copy" color="white" size={25} />
        </ActionButton.Item>
      </ActionButton>
    </Screen>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 20,
    backgroundColor: colors.dark,
    borderRadius: 30,
    elevation: 8,
  },
  screen: {
    padding: 10,
  },
});
export default ViewListingScreen;
