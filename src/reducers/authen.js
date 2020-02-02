import { SET_LOGIN_USER, SET_LOGIN_UID, LOGOUT } from "../actions/authen";

const initialState = {
  user: {
    uid: "",
    username: "",
    email: "",
    firstname: "",
    lastname: "",
    type: ""
  }
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_LOGIN_USER:
      return { ...state, user: { ...state.user, ...payload } };
    case SET_LOGIN_UID:
      return { ...state, user: { ...state.user, ...payload } };
    case LOGOUT:
      return { ...state, user: {} };
    default:
      return state;
  }
};
