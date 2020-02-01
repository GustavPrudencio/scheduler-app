import React, { useState } from "react";
import omit from "lodash/omit";
import firebase from "../../firebase";
import { noti } from "../../helper";
import SignIn from "../SignIn";
import SignUp from "../SignUp";

const Authen = () => {
  const [view, setView] = useState("signin");

  /**
   * Save sign up user info into database
   * @param {Object} userinfo
   */
  const saveUser = userinfo => {
    const { uid } = firebase.auth().currentUser;
    firebase
      .database()
      .ref(`users/${uid}`)
      .set({ ...userinfo, uid });
  };

  /**
   * Make login
   * @param {Object} data {email, password}
   */
  const handleOnSignIn = async data => {
    const { email, password } = data;
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(err => {
        const { message } = err;
        noti.error({ description: message });
      });
  };

  /**
   * Make sign up
   * @param {Object} data user info
   */
  const handleOnSignUp = data => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(() => {
        const { uid } = firebase.auth().currentUser;
        firebase
          .database()
          .ref(`users/${uid}`)
          .set(omit(data, "password"), err => {
            if (err) {
              const { message } = err;
              noti.error({ description: message });
            } else saveUser(omit(data, "password"));
          });
      })
      .catch(err => {
        const { message } = err;
        noti.error({ description: message });
      });
  };

  if (view === "signin") {
    return (
      <SignIn onSignIn={handleOnSignIn} onSignUp={() => setView("signup")} />
    );
  }
  return (
    <SignUp onSignIn={() => setView("signin")} onSignUp={handleOnSignUp} />
  );
};

export default Authen;
