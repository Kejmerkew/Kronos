import AsyncStorage from "@react-native-async-storage/async-storage";

const getAllKeys = async () => {
  let keys = [];
  try {
    keys = await AsyncStorage.getAllKeys();
  } catch (e) {
    // read key error
  }

  // example console.log result:
  // ['@MyApp_user', '@MyApp_key']
  return keys;
};

const readItemFromStorage = async (key) => {
  const item = await AsyncStorage.getItem(key);
  return item;
};

const writeItemToStorage = async (key, newValue) => {
  await AsyncStorage.setItem(key, newValue);
};

const clearAll = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    //error
  }

  console.log("Async storage cleared!");
};

export default {
  readItemFromStorage,
  writeItemToStorage,
  clearAll,
  getAllKeys,
};
