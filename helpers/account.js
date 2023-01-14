import { getDatabase, ref, set, onValue } from "firebase/database";
import firebaseApp from "./firebaseApp";

const checkIfUserExists = async () => {
  const user = await JSON.parse(localStorage.getItem("auth"));
  return user;
};

export default checkIfUserExists;
