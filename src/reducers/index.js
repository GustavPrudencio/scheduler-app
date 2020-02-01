import { combineReducers } from "redux";
import authen from "./authen";
import firebase from "./firebase";

export default combineReducers({ authen, firebase });
