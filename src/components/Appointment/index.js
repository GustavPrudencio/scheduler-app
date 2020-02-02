import React, { useState } from "react";
import PropTypes from "prop-types";
import { DatePicker, Select, Divider, Row, Col, Modal, Button } from "antd";
import moment from "moment";
import { appointmentTimes } from "../../helper";
import SelectDoctor from "../SelectDoctor";
import "./style.scss";
import AppointmentInfo from "../AppointmentInfo";

const { Option } = Select;

const getDisabledTimeByDoctorUID = (
  selectedDate,
  appointmentList,
  doctorUID
) => {
  if (!selectedDate || !appointmentList || !doctorUID) return [];
  return appointmentList
    .filter((appointment) => {
      const { doctor, date } = appointment;
      return (
        doctor.uid === doctorUID && moment(selectedDate).isSame(date, "day")
      );
    })
    .map((appointment) => appointment.time);
};

const Appointment = ({ appointmentList, user, userList, onSubmit }) => {
  const [error, setError] = useState({
    doctor: false,
    date: false,
    time: false
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [state, setState] = useState({
    doctor: "",
    date: moment(),
    time: ""
  });

  const onChange = (key, value) => {
    if (key === "time") setState({ ...state, [key]: value });
    else setState({ ...state, [key]: value, time: "" });
  };

  const onCloseModal = () => {
    setState({ doctor: "", date: moment(), time: "" });
    setModalVisible(false);
  };

  const resetError = () => {
    setError({
      ...error,
      doctor: !state.doctor,
      date: !state.date,
      time: state.time === ""
    });
  };

  const handleOnSubmit = () => {
    if (!!state.doctor && !!state.date && state.time !== "") {
      onSubmit(state);
      onCloseModal();
    }
    resetError();
  };

  const disabledList = getDisabledTimeByDoctorUID(
    state.date,
    appointmentList,
    state.doctor
  );

  return (
    <div className="appointment">
      <Button type="primary" icon="plus" onClick={() => setModalVisible(true)}>
        Add appointment
      </Button>
      <Modal
        title="Add appointment"
        visible={modalVisible}
        onOk={handleOnSubmit}
        onCancel={onCloseModal}
        okText="Add"
      >
        <Row>
          <Col>
            <label htmlFor="select-doctor">Doctor</label>
            <SelectDoctor
              className={`${error.doctor ? "error" : ""}`}
              id="select-doctor"
              users={userList}
              value={state.doctor}
              onChange={(value) => onChange("doctor", value)}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <label htmlFor="date-picker">Date</label>
            <DatePicker
              className={`${error.doctor ? "error" : ""}`}
              id="date-picker"
              value={moment(state.date)}
              onChange={(value) => onChange("date", value)}
              format="DD MMM YYYY"
            />
            <label htmlFor="time-picker">Time</label>
            <Select
              className={`select ${error.doctor ? "error" : ""}`}
              id="time-picker"
              value={state.time}
              onChange={(value) => onChange("time", value)}
            >
              {appointmentTimes.map((apt, index) => {
                return (
                  <Option
                    disabled={disabledList.includes(index)}
                    key={apt}
                    value={index}
                  >
                    {apt}
                  </Option>
                );
              })}
            </Select>
          </Col>
        </Row>
        <Divider />
        <AppointmentInfo
          patient={user}
          doctor={userList.find(({ uid }) => state.doctor === uid)}
          date={state.date}
          time={state.time}
        />
      </Modal>
    </div>
  );
};

Appointment.propTypes = {
  appointmentList: PropTypes.array.isRequired,
  userList: PropTypes.array.isRequired,
  user: PropTypes.shape().isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default Appointment;
