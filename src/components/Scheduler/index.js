import React, { useState } from "react";
import PropTypes from "prop-types";
import get from "lodash/get";
import { Table, DatePicker, Switch, Divider, Modal } from "antd";
import "./style.scss";
import moment from "moment";
import pick from "lodash/pick";
import isEmpty from "lodash/isEmpty";
import {
  appointmentTimeToString,
  generateObjectId,
  noti,
  getFullName
} from "../../helper";
import firebase from "../../firebase";
import Appointment from "../Appointment";

const Scheduler = ({ user, userList, appointmentList }) => {
  const [modalDetail, setModalDetail] = useState(false);
  const [filterDate, setFilterDate] = useState(moment());
  const [isFilter, setIsFilter] = useState(false);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (value) => moment(value).format("DD MMMM YYYY")
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      render: (value) => appointmentTimeToString(value),
      sorter: (a, b) => parseFloat(a.time) - parseFloat(b.time)
    },
    {
      title: "Doctor Name",
      dataIndex: "doctor",
      key: "doctor",
      render: (value) => getFullName(value)
    },
    {
      title: "Patient Name",
      dataIndex: "patient",
      key: "patient",
      render: (value) => getFullName(value)
    }
  ];

  const onAddAppointmentAdd = (appointmentInfo) => {
    const { doctor, date, time } = pick(appointmentInfo, [
      "doctor",
      "date",
      "time"
    ]);

    if (isEmpty(doctor) || isEmpty(date) || time === "") return;

    const appointment = {
      doctor,
      date: date.toISOString(),
      time,
      patient: get(user, "uid")
    };

    firebase
      .database()
      .ref(`appointments/${generateObjectId()}`)
      .set(appointment, (err) => {
        if (err) noti.error({ description: err.message });
        else {
          noti.success({
            description: "Appoiment was added into your schedule"
          });
        }
      });
  };

  const filter = (source) => {
    return source.filter(({ date, patient }) => {
      if (!filterDate || !isFilter) return patient.uid === user.uid;
      return moment(filterDate).isSame(date, "day") && patient.uid === user.uid;
    });
  };

  return (
    <div className="scheduler">
      <div className="filter">
        <Appointment
          onSubmit={onAddAppointmentAdd}
          user={user}
          userList={userList}
          appointmentList={appointmentList}
        />
        <Divider type="vertical" />
        <Switch
          size="small"
          className="switch"
          checked={isFilter}
          onChange={(value) => setIsFilter(value)}
        />
        <span>Filter by date</span>
        <DatePicker
          format="DD MMMM YYYY"
          disabled={!isFilter}
          value={filterDate}
          onChange={(value) => setFilterDate(value)}
        />
      </div>
      <Table
        onRow={(record) => {
          return {
            onClick: () =>
              Modal.info({
                title: "Appointment Info",
                content: (
                  <div>
                    <p>{record.key}</p>
                    <p>some messages...some messages...</p>
                  </div>
                ),
                onOk() {}
              })
          };
        }}
        rowKey="key"
        columns={columns}
        dataSource={filter(appointmentList)}
      />
      <Modal
        title="Add appointment"
        visible={modalDetail}
        onOk={() => setModalDetail(false)}
        onCancel={() => setModalDetail(false)}
        okText="Delete"
      >
        detail
      </Modal>
    </div>
  );
};

Scheduler.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  }).isRequired,
  userList: PropTypes.array.isRequired,
  appointmentList: PropTypes.array.isRequired
};

export default Scheduler;
