import CryptoES from "crypto-es";

const encryptSHA256 = (masterPass) => {
  const sha256Key = CryptoES.SHA256(masterPass, { key: 256 / 32 });
  return sha256Key.toString();
};

const encryptAES = (masterPass, key) => {
  const encrypted = CryptoES.AES.encrypt(masterPass, key);
  return encrypted.toString();
};

const decryptAES = (word, key) => {
  try {
    const decrypted = CryptoES.AES.decrypt(word, key);
    return decrypted.toString(CryptoES.enc.Utf8);
  } catch (error) {
    console.log("DECrypt ERROR: ", error);
    return null;
  }
};

const encryptHMAC = (masterPass, key) => {
  const masterKey = CryptoES.HmacSHA256(masterPass, key);
  return masterKey.toString();
};

const encryptPBKDF2 = (masterPass) => {
  const salt = encryptSHA256(masterPass);
  const key256 = CryptoES.PBKDF2(masterPass, salt, { key: 256 / 32 });
  return key256.toString();
};

// const JsonFormatter = {
//   stringify: function (cipherParams) {
//     // create json object with ciphertext
//     const jsonObj = {
//       ct: cipherParams.ciphertext.toString(CryptoES.enc.Base64),
//     }; // optionally add iv and salt
//     if (cipherParams.iv) {
//       jsonObj.iv = "IV";
//     }
//     if (cipherParams.salt) {
//       jsonObj.s = "SALT";
//     }
//     // stringify json object
//     return JSON.stringify(jsonObj);
//   },
//   parse: function (jsonStr) {
//     // parse json string
//     const jsonObj = JSON.parse(jsonStr); // extract ciphertext from json object, and create cipher params object
//     const cipherParams = CryptoES.lib.CipherParams.create({
//       ciphertext: CryptoES.enc.Base64.parse(jsonObj.ct),
//     }); // optionally extract iv and salt
//     if (jsonObj.iv) {
//       cipherParams.iv = CryptoES.enc.Hex.parse(jsonObj.iv);
//     }
//     if (jsonObj.s) {
//       cipherParams.salt = CryptoES.enc.Hex.parse(jsonObj.s);
//     }
//     return cipherParams;
//   },
// };

export default {
  encryptSHA256,
  encryptAES,
  encryptHMAC,
  encryptPBKDF2,
  decryptAES,
};
