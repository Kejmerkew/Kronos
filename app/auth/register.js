import asyncApi from "../api/async";
import Encrypt from "../auth/encryption";

const checkKeys = async (key) => {
  const keys = await asyncApi.getAllKeys();

  for (let i = 0; i < keys.length; i++) {
    if (key == keys[i]) {
      return 1; //match
    }
  }

  return 0; //no match
};

const registerUser = async (newUser) => {
  const key = "@" + newUser.username;
  const check = await checkKeys(key);

  const encryptedKey = Encrypt.encryptPBKDF2(
    newUser.username + newUser.password
  );
  const encryptedUser = Encrypt.encryptAES(
    newUser.username + newUser.password,
    encryptedKey
  );

  if (check == 0) {
    try {
      await asyncApi.writeItemToStorage(key, JSON.stringify(encryptedUser));
    } catch (error) {
      console.log("Register ERROR: ", error);
    }

    return true;
  } else if (check == 1) {
    const error = "Username already exists!";
    return error;
  }
};

export default { registerUser };
