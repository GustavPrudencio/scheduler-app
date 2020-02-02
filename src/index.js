import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import pick from "lodash/pick";
import _ from "lodash";
import "firebase/auth";
import "firebase/database";
import "antd/dist/antd.css";
import firebase from "./firebase";
import configurationStore from "./store/configurationStore";
import { setUsers, setAppointments } from "./actions/firebase";
import { setLogInUser, setLogInUID, logout } from "./actions/authen";
import App from "./App";
import "./style.scss";

const store = configurationStore();

const { dispatch, getState } = store;

/**
 * Watch users change then sync users
 */
firebase
  .database()
  .ref("users")
  .on("value", (snapshot) => {
    if (snapshot.val) {
      const nextUsers = [];
      snapshot.forEach((snap) => {
        nextUsers.push({ ...snap.val() });
      });
      dispatch(setUsers(nextUsers));
    }
  });

/**
 * Watch appointments change then sync appointments
 */
firebase
  .database()
  .ref("appointments")
  .on("value", (snapshot) => {
    if (snapshot.val) {
      const { users } = getState().firebase;
      const nextAppointments = [];
      snapshot.forEach((snap) => {
        const { key } = snap;
        const value = snap.val();
        const doctor = users.find((user) => user.uid === value.doctor);
        const patient = users.find((user) => user.uid === value.patient);
        nextAppointments.push({ ...value, doctor, patient, key });
      });
      dispatch(setAppointments(nextAppointments));
    }
  });

/**
 * Watch login success then sync user infomation
 */
firebase.auth().onAuthStateChanged((data) => {
  if (data) {
    dispatch(setLogInUID(pick(data, "uid")));
    firebase
      .database()
      .ref(`users/${data.uid}`)
      .once("value")
      .then((snap) => snap.val && dispatch(setLogInUser(snap.val())));
  } else dispatch(logout());
});

ReactDOM.render(
  <Provider store={store} key="provider">
    <App />
  </Provider>,
  document.getElementById("root")
);
