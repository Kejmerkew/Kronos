import { useEffect, useState } from "react";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("db.testDb");
let User = "";

const createDatabase = (user) => {
  User = user;
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS '" +
        user +
        "' (id INTEGER PRIMARY KEY, name TEXT, url TEXT, username TEXT, password TEXT, notes TEXT)",
      null,
      (tx, results) => {
        console.log("Created table");
      },
      (tx, error) => {
        console.log(error);
      }
    );
  });
};

const getListings = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM '" + User + "'",
        null,
        (tx, results) => {
          const temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
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

const updateListing = (listing, ID) => {
  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE '" +
        User +
        "' SET name=?, url=?, username=?, password=?, notes=? WHERE id=?",
      [
        listing.name,
        listing.url,
        listing.username,
        listing.password,
        listing.notes,
        ID,
      ],
      (tx, results) => {
        console.log("Updated items!");
      },
      (tx, error) => {
        console.log(error);
      }
    );
  });
};

const addListing = (listing) => {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO '" +
        User +
        "' (name, url, username, password, notes) VALUES (?, ?, ?, ?, ?)",
      [
        listing.name,
        listing.url,
        listing.username,
        listing.password,
        listing.notes,
      ],
      (tx, results) => {
        console.log("Inserted items");
        // console.log(data);
      },
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
      (tx, results) => {
        console.log("Items deleted!");
      },
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
