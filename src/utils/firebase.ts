import firebase from "firebase/app";
import config from "./firebase.config";
import "firebase/firestore";
import "firebase/auth";

const firebaseApp = firebase.initializeApp(config);

// Firestore
export const firestore = firebaseApp.firestore();
