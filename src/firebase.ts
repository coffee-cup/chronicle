import firebase from "firebase/app";

export const config =
  process.env.NODE_ENV === "development"
    ? {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: "chronicle-dev-asdf.firebaseapp.com",
        databaseURL: "https://chronicle-dev-asdf.firebaseio.com",
        projectId: "chronicle-dev-asdf",
        storageBucket: "chronicle-dev-asdf.appspot.com",
        messagingSenderId: "917335616719",
        appId: "1:917335616719:web:1eb737f17fa6282d469bba",
      }
    : {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: "chronicle-e42f2.firebaseapp.com",
        databaseURL: "https://chronicle-e42f2.firebaseio.com",
        projectId: "chronicle-e42f2",
        storageBucket: "chronicle-e42f2.appspot.com",
        messagingSenderId: "738524048218",
        appId: "1:738524048218:web:3366b04566986c2b472163",
      };

if (!firebase.apps.length) {
  try {
    firebase.initializeApp(config);
  } catch (e) {
    console.error(e);
  }
}
