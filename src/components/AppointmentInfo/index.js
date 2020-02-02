import React from "react";
import PropTypes from "prop-types";
import { Descriptions } from "antd";
import moment from "moment";
import { getFullName, appointmentTimeToString } from "../../helper";

const AppointmentInfo = ({ doctor, patient, date, time }) => {
  return (
    <Descriptions bordered size="small">
      <Descriptions.Item label="Date" span={3}>
        {moment(date).format("DD MMM YYYY")}
      </Descriptions.Item>
      <Descriptions.Item label="Time" span={3}>
        {time !== "" ? appointmentTimeToString(time) : ""}
      </Descriptions.Item>
      <Descriptions.Item label="Doctor's Name" span={3}>
        {getFullName(doctor)}
      </Descriptions.Item>
      <Descriptions.Item label="Patient's Name" span={3}>
        {getFullName(patient)}
      </Descriptions.Item>
    </Descriptions>
  );
};

AppointmentInfo.propTypes = {
  doctor: PropTypes.shape(),
  patient: PropTypes.shape(),
  date: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  time: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

AppointmentInfo.defaultProps = {
  doctor: {},
  patient: {},
  date: {},
  time: ""
};

export default AppointmentInfo;
