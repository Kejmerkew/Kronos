import React from "react";
import { View, StyleSheet } from "react-native";
import AppText from "./AppText";
import { AppForm, AppFormField, SubmitButton } from "./forms";

function ListComponent({
  buttonColor,
  initialValues,
  onSubmit,
  validationSchema,
  text,
  buttonTitle,
  secureTextEntry,
  ...otherProps
}) {
  return (
    <AppForm
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <View style={styles.header}>
        <AppText style={styles.text}>{text}</AppText>
      </View>

      <AppFormField
        icon="database"
        maxLength={100}
        name="name"
        placeholder="Name"
        {...otherProps}
      />
      <AppFormField
        icon="web"
        keyboardType="default"
        maxLength={255}
        name="url"
        placeholder="URL"
        {...otherProps}
      />
      <AppFormField
        autoCapitalize="none"
        icon="account"
        keyboardType="default"
        maxLength={50}
        name="username"
        placeholder="Username"
        {...otherProps}
      />
      <AppFormField
        icon="lock"
        keyboardType="default"
        maxLength={100}
        name="password"
        secureTextEntry={secureTextEntry}
        placeholder="Password"
        textContentType="password"
        {...otherProps}
      />
      <AppFormField
        icon="note"
        maxLength={255}
        multiline
        name="notes"
        numberOfLines={3}
        placeholder="Notes..."
        {...otherProps}
      />
      <SubmitButton title={buttonTitle} color={buttonColor} />
    </AppForm>
  );
}

const styles = StyleSheet.create({
  header: {
    alignSelf: "center",
    paddingVertical: 20,
  },
  text: {
    fontWeight: "bold",
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
});
export default ListComponent;
