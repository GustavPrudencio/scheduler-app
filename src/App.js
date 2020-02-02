import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import Authen from "./components/Authen";
import Console from "./components/Console";

const mapStateToProps = ({ authen }) => {
  return { currentUser: authen.user };
};

const App = ({ currentUser }) => {
  if (isEmpty(currentUser)) return <Authen />;
  return <Console />;
};

App.propTypes = {
  currentUser: PropTypes.shape().isRequired
};

export default connect(mapStateToProps, null)(App);
