export const SET_LOGIN_USER = "SET_LOGIN_USER";
export const SET_LOGIN_UID = "SET_LOGIN_UID";
export const LOGOUT = "LOGOUT";

export const setLogInUser = (user) => {
  return {
    type: SET_LOGIN_USER,
    payload: user
  };
};

export const setLogInUID = (payload) => {
  return {
    type: SET_LOGIN_UID,
    payload
  };
};

export const logout = () => {
  return {
    type: LOGOUT
  };
};
