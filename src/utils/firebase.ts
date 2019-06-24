import firebase from "firebase/app";
import "firebase/firestore";
import firebaseConfig from "./firebase.config";

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
