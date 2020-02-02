import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";
import moment from "moment";
import { getFullName, appointmentTimeToString } from "../../helper";

const AppointmentInfo = ({ doctor, patient, date, time }) => {
  return (
    <>
      <Row>
        <Col>
          <div className="detail-doctor">
            <p>
              <b>Patient name:</b>
              {getFullName(patient)}
            </p>
          </div>
        </Col>
        <Col>
          <div className="detail-doctor">
            <p>
              <b>Doctor name: </b>
              {getFullName(doctor)}
            </p>
          </div>
        </Col>
        <Col>
          <div className="detail-doctor">
            <p>
              <b>Date: </b>
              {` ${moment(date).format("DD MMM YYYY")}`}
            </p>
          </div>
        </Col>
        <Col>
          <div className="detail-doctor">
            <p>
              <b>Time:</b>
              {` ${time !== "" ? appointmentTimeToString(time) : ""}`}
            </p>
          </div>
        </Col>
      </Row>
    </>
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
