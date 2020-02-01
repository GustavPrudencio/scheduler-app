import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import pick from "lodash/pick";
import "firebase/auth";
import "firebase/database";
import "antd/dist/antd.css";
import firebase from "./firebase";
import configurationStore from "./store/configurationStore";
import { setUsers, setAppointments } from "./actions/firebase";
import { setLogInUser, setLogInUID, logout } from "./actions/authen";
import App from "./App";

const store = configurationStore();

const { dispatch } = store;

/**
 * Watch users change then sync users
 */
firebase
  .database()
  .ref("users")
  .on("value", snap => snap.val && dispatch(setUsers(snap.val())));

/**
 * Watch appointments change then sync appointments
 */
firebase
  .database()
  .ref("appointments")
  .on("value", snap => snap.val && dispatch(setAppointments(snap.val())));

/**
 * Watch login success then sync user infomation
 */
firebase.auth().onAuthStateChanged(data => {
  if (data) {
    dispatch(setLogInUID(pick(data, "uid")));
    firebase
      .database()
      .ref("users/" + data.uid)
      .once("value")
      .then(snap => snap.val && dispatch(setLogInUser(snap.val())));
  } else dispatch(logout());
});

ReactDOM.render(
  <Provider store={store} key="provider">
    <App />
  </Provider>,
  document.getElementById("root")
);
