import asyncApi from "../api/async";

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
  let newUser = "";
  const key = "@" + userTyped.username;
  const checkUser = await checkUserExists(key);

  if (checkUser == 1) {
    try {
      newUser = await asyncApi.readItemFromStorage(key);
    } catch (error) {
      console.log("Login ERROR: ", error);
    }

    //validate user
    const validate = validateUser(userTyped, JSON.parse(newUser));
    return validate;
  }
};

const validateUser = (userTyped, newUser) => {
  // console.log("Login VALUE: ", user.username);
  // console.log("LOGIN TYPED: ", userTyped.username);

  if (userTyped.username == newUser.username) {
    if (userTyped.password == newUser.password) {
      return true;
    } else {
      return false;
    }
  }
};

export default { loginUser };
