/* eslint-disable no-bitwise */
import React from "react";
import _ from "lodash";
import { notification, Icon } from "antd";

const { isEmpty, get } = _;

export const localStorage = () => {
  const key = "doctorscheduler";

  function getToken() {
    const json = JSON.parse(window.localStorage.getItem(key));
    return get(json, "token") || undefined;
  }

  function setToken(token) {
    window.localStorage.setItem(key, JSON.stringify({ token }));
  }

  function clearStorage() {
    window.localStorage.removeItem(key);
  }

  return {
    getToken,
    setToken,
    clearStorage
  };
};

export const noti = {
  success: ({ message = "Success", description = "" }) => {
    notification.error({
      message,
      description,
      icon: <Icon type="check-circle" style={{ color: "green" }} />
    });
  },
  warning: ({ message = "Warning", description = "" }) => {
    notification.warning({
      message,
      description,
      icon: <Icon type="warning" style={{ color: "yellow" }} />
    });
  },
  error: ({ message = "Error", description = "" }) => {
    notification.error({
      message,
      description,
      icon: <Icon type="stop" style={{ color: "red" }} />
    });
  }
};

export const appointmentTimes = [
  "8:00-8:30",
  "8:30-9:00",
  "9:00-9:30",
  "9:30-10:00",
  "10:00-10:30",
  "10:30-11:00",
  "11:00-11:30",
  "11:30-12:00",
  "13:00-13:30",
  "13:30-14:00",
  "14:00-14:30",
  "14:30-15:00",
  "15:00-15:30",
  "15:30-16:00",
  "16:00-16:30",
  "16:30-16:00"
];

export const appointmentTimeToString = time => {
  return appointmentTimes[parseFloat(time)];
};

export const appointmentsToArray = appointments => {
  const array = [];
  _(appointments)
    .keys()
    .forEach(key => array.push(appointments[key]));
  return array;
};

export const generateObjectId = () => {
  const timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
  return `00000000${timestamp}${"xxxxxxxxxxxxxxxx".replace(/[x]/g, () => {
    return ((Math.random() * 16) | 0).toString(16);
  })}`.toUpperCase();
};

export const getNameByUID = (users, uid) => {
  if (isEmpty(uid)) return "";
  const { firstname, lastname } = get(users, uid) || {};
  return `${firstname} ${lastname}`;
};
