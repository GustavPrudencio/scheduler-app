export const SET_USERS = "SET_USERS";
export const SET_APPOINTMENT = "SET_APPOINTMENT";

export const setUsers = users => {
  return {
    type: SET_USERS,
    payload: users
  };
};

export const setAppointments = appointments => {
  return {
    type: SET_APPOINTMENT,
    payload: appointments
  };
};
