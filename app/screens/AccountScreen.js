import React, { useContext } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import Screen from "../components/Screen";
import ListItem from "../components/lists/ListItem";
import colors from "../config/colors";
import Icon from "../components/Icon";
import ListItemSeparatorComponent from "../components/lists/ListItemSeparator";
import AuthContext from "../auth/context";

const menuItems = [
  {
    title: "Settings",
    icon: {
      name: "cogs",
      backgroundColor: colors.primary,
    },
    targetScreen: "Listings",
  },
  {
    title: "Log Out",
    icon: {
      name: "logout",
      backgroundColor: colors.logout,
    },
    targetScreen: "Messages",
  },
];

function AccountScreen({ navigation }) {
  const { User, setUser } = useContext(AuthContext);

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title={User}
          subTitle="Email"
          IconComponent={<FontAwesome5 name="user-cog" size={30} />}
        />
      </View>

      <View style={styles.container}>
        <ListItem
          title="Settings"
          IconComponent={<Icon name="cogs" backgroundColor={colors.primary} />}
        />
        <ListItem
          title="Log Out"
          IconComponent={<Icon name="logout" backgroundColor={colors.logout} />}
          onPress={() => setUser(null)}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  screen: {
    backgroundColor: colors.light,
  },
});
export default AccountScreen;
