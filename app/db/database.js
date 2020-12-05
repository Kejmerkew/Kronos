import { useEffect, useState } from "react";
import * as SQLite from "expo-sqlite";
import Encrypt from "../auth/encryption";

const db = SQLite.openDatabase("db.testDb");
let User = "";

const encryptedListing = {
  name: "",
  url: "",
  username: "",
  password: "",
};

const createDatabase = (user) => {
  User = user;
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS '" +
        user +
        "' (id INTEGER PRIMARY KEY, name TEXT, url TEXT, username TEXT, password TEXT, notes TEXT)",
      null,
      (tx, results) => {},
      (tx, error) => {
        console.log(error);
      }
    );
  });
};

const decrypt = (encObj, masterKey) => {
  if (encObj && masterKey) {
    encObj.name = Encrypt.decryptAES(encObj.name, masterKey);
    encObj.url = Encrypt.decryptAES(encObj.url, masterKey);
    encObj.username = Encrypt.decryptAES(encObj.username, masterKey);
    encObj.password = Encrypt.decryptAES(encObj.password, masterKey);
    encObj.notes = Encrypt.decryptAES(encObj.notes, masterKey);

    return encObj;
  }
};

const getListings = (masterKey) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM '" + User + "'",
        null,
        (tx, results) => {
          const temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            const decryptedObj = decrypt(results.rows.item(i), masterKey);
            temp.push(decryptedObj);
            setItems(temp);
          }
        },
        (tx, error) => {
          console.log(error);
        }
      );
    });
  }, []);

  return items;
};

const updateListing = (listing, ID, masterKey) => {
  encryptedListing.name = Encrypt.encryptAES(listing.name, masterKey);
  encryptedListing.url = Encrypt.encryptAES(listing.url, masterKey);
  encryptedListing.username = Encrypt.encryptAES(listing.username, masterKey);
  encryptedListing.password = Encrypt.encryptAES(listing.password, masterKey);
  encryptedListing.notes = Encrypt.encryptAES(listing.notes, masterKey);

  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE '" +
        User +
        "' SET name=?, url=?, username=?, password=?, notes=? WHERE id=?",
      [
        encryptedListing.name,
        encryptedListing.url,
        encryptedListing.username,
        encryptedListing.password,
        encryptedListing.notes,
        ID,
      ],
      (tx, results) => {},
      (tx, error) => {
        console.log(error);
      }
    );
  });
};

const addListing = (listing, masterKey) => {
  encryptedListing.name = Encrypt.encryptAES(listing.name, masterKey);
  encryptedListing.url = Encrypt.encryptAES(listing.url, masterKey);
  encryptedListing.username = Encrypt.encryptAES(listing.username, masterKey);
  encryptedListing.password = Encrypt.encryptAES(listing.password, masterKey);
  encryptedListing.notes = Encrypt.encryptAES(listing.notes, masterKey);

  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO '" +
        User +
        "' (name, url, username, password, notes) VALUES (?, ?, ?, ?, ?)",
      [
        encryptedListing.name,
        encryptedListing.url,
        encryptedListing.username,
        encryptedListing.password,
        encryptedListing.notes,
      ],
      (tx, results) => {},
      (tx, error) => {
        console.log(error);
      }
    );
  });

  /*console.log("Name: " + listing.name);
  console.log("URL: " + listing.url);
  console.log("Username: " + listing.username);
  console.log("Password: " + listing.password);
  console.log("Notes: " + listing.notes);*/

  return;
};

const deleteListing = (ID) => {
  db.transaction((tx) => {
    tx.executeSql(
      "DELETE FROM '" + User + "' WHERE id=?",
      [ID],
      (tx, results) => {},
      (tx, error) => {
        console.log(error);
      }
    );
  });
};

export default {
  createDatabase,
  addListing,
  getListings,
  updateListing,
  deleteListing,
};
