import firebase from "firebase/app";

const config = {
  apiKey: "AIzaSyBv-USbxz7s-opBYY7l88RT4RAXIKs6zj8",
  authDomain: "thyahan-doctor-scheduler.firebaseapp.com",
  databaseURL: "https://thyahan-doctor-scheduler.firebaseio.com",
  projectId: "thyahan-doctor-scheduler",
  storageBucket: "thyahan-doctor-scheduler.appspot.com",
  messagingSenderId: "700066089122",
  appId: "1:700066089122:web:e54964913724c4bde22ffb",
  measurementId: "G-VG0JN4Q9JG"
};

firebase.initializeApp(config);

export default firebase;
