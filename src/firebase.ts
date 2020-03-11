import firebase from "firebase";

export const config = {
  apiKey: "AIzaSyBbip1PzscwdE0De_l9FCB3yTggVtT76BM",
  authDomain: "chronicle-e42f2.firebaseapp.com",
  databaseURL: "https://chronicle-e42f2.firebaseio.com",
  projectId: "chronicle-e42f2",
  storageBucket: "chronicle-e42f2.appspot.com",
  messagingSenderId: "738524048218",
  appId: "1:738524048218:web:3366b04566986c2b472163"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
