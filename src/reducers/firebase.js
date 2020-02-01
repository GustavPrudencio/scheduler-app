import { SET_USERS, SET_APPOINTMENT } from "../actions/firebase";
const initialState = {
  firebase: {},
  users: [],
  appointments: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_USERS:
      return { ...state, users: payload };
    case SET_APPOINTMENT:
      return { ...state, appointments: payload };
    default:
      return state;
  }
};
