import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import firebaseConfig from "./firebase.config";

// if no firebase app is initialized then do so
if (!firebase.apps || firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

// Run on localhost database if hostname is localhost
if (window.location.hostname === "localhost" && true) {
  console.log("running on localhost");
  firebase.firestore().useEmulator("localhost", 8081);
  firebase.auth().useEmulator("http://localhost:9099");
}

// Export the auth functions
export const auth = firebase.auth();

export const persistence = firebase.auth.Auth.Persistence.LOCAL;

// Export the Firestore functions and static variables
export const firestore = firebase.firestore();
export const increment = firebase.firestore.FieldValue.increment;
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
