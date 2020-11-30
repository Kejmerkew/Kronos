import asyncApi from "../api/async";

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

  //   asyncApi.clearAll();

  if (check == 0) {
    try {
      await asyncApi.writeItemToStorage(key, JSON.stringify(newUser));
    } catch (error) {
      console.log("Register ERROR: ", error);
    }

    return true;
  } else if (check == 1) {
    console.log("Username already exists!");
  }
};

export default { registerUser };
