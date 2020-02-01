import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import Authen from "./components/Authen";

const mapStateToProps = ({ authen }) => {
  return { currentUser: authen.user };
};

const App = ({ currentUser }) => {
  console.log(currentUser);
  if (isEmpty(currentUser)) return <Authen />;
  return <p>currentUser: {currentUser.uid}</p>;
};

export default connect(mapStateToProps, null)(App);
