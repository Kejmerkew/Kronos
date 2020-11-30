import React, { useContext } from "react";
import { StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Card from "../components/Card";
import colors from "../config/colors";
import Screen from "../components/Screen";
import routes from "../navigation/routes";
import database from "../db/database";
import AuthContext from "../auth/context";

function HomeScreen({ navigation }) {
  const { User } = useContext(AuthContext);
  database.createDatabase("DB_" + User);
  const data = database.getListings();

  return (
    <Screen style={styles.screen}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card
            title={item.name}
            subTitle={item.username}
            onPress={() => navigation.navigate(routes.VIEW_LIST, item)}
          />
        )}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate(routes.ADD_LIST)}
        style={styles.button}
      >
        <MaterialCommunityIcons color={colors.white} name="plus" size={30} />
      </TouchableOpacity>
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
    backgroundColor: colors.light,
    padding: 15,
  },
});

export default HomeScreen;
