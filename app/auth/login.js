import asyncApi from "../api/async";
import Encrypt from "./encryption";

const checkUserExists = async (key) => {
  const keys = await asyncApi.getAllKeys();

  for (let i = 0; i < keys.length; i++) {
    if (key == keys[i]) {
      return 1; //match
    }
  }

  return 0; //no match
};

const loginUser = async (userTyped) => {
  let existingUser = "";
  const key = "@" + userTyped.username;
  const checkUser = await checkUserExists(key);

  if (checkUser == 1) {
    try {
      existingUser = await asyncApi.readItemFromStorage(key);
    } catch (error) {
      console.log("Login ERROR: ", error);
    }

    existingUser = JSON.parse(existingUser);

    const decryptedKey = Encrypt.encryptPBKDF2(
      userTyped.username + userTyped.password
    );
    const decryptedUser = Encrypt.decryptAES(existingUser, decryptedKey);

    if (decryptedUser) {
      //validate user
      const validate = validateUser(userTyped, decryptedUser);
      return validate;
    }

    return false;
  }
};

const validateUser = (userTyped, existingUser) => {
  // console.log("Login VALUE: ", user.username);
  // console.log("LOGIN TYPED: ", userTyped.username);

  if (userTyped.username + userTyped.password == existingUser) {
    return true;
  } else {
    return false;
  }
};

export default { loginUser };
