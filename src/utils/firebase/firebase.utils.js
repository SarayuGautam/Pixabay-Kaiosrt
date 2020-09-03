import firebase from "firebase/app";
import "firebase/database";

firebase.initializeApp({
  apiKey: "AIzaSyBVo46h8i6Za7xzNZ1bTtMzwAVswoKRW3g",
  authDomain: "image-album-kaios.firebaseapp.com",
  databaseURL: "https://image-album-kaios.firebaseio.com",
  projectId: "image-album-kaios",
  storageBucket: "image-album-kaios.appspot.com",
  messagingSenderId: "471337136270",
  appId: "1:471337136270:web:c83e0ba4ff654621ec59df"
});

const database = firebase.database();

export const getTags = async () =>
  database
    .ref("/tags")
    .once("value")
    .then(snapshot => Object.keys(snapshot.val()));
