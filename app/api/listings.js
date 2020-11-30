import React, { useEffect, useState } from "react";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("db.testDb");

db.transaction((tx) => {
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS testTable3 (id INTEGER PRIMARY KEY, name TEXT, url TEXT, username TEXT, password TEXT, notes TEXT)",
    [],
    (tx, results) => {
      console.log("Created table testTable3");
    },
    (tx, error) => {
      console.log(error);
    }
  );
});

const getListings = () => {
  let [items, setItems] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT id, name, username FROM testTable3",
        null,
        (tx, results) => {
          var temp = [];
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

const addListing = (listing) => {
  const data = new FormData();

  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO testTable3 (name, url, username, password, notes) VALUES (?, ?, ?, ?, ?)",
      [
        listing.name,
        listing.url,
        listing.username,
        listing.password,
        listing.notes,
      ],
      (tx, results) => {
        data.append("name", listing.name);
        data.append("url", listing.url);
        data.append("username", listing.username);
        data.append("password", listing.password);
        data.append("notes", listing.notes);

        console.log("Inserted items");
        console.log(data);
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

  return data;
};

export default { addListing, getListings };
