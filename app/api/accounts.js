import client from "./client";
import fbDatabase from "firebase/database";

const endpoint = "/accounts";

const getAccounts = () => client.get(endpoint);

const addAccounts = (account, onUploadProgress) => {};
