import React, { useState } from "react";
import PropTypes from "prop-types";
import get from "lodash/get";
import { Table, DatePicker, Divider, Modal, Icon, Popconfirm } from "antd";
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
import AppointmentInfo from "../AppointmentInfo";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const Scheduler = ({
  user,
  userList,
  appointmentList,
  onAppointmentDelete
}) => {
  const [modalDetail, setModalDetail] = useState(false);
  const [filterDate, setFilterDate] = useState("");
  const { width } = useWindowDimensions();

  const columns = [
    {
      width: "35%",
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (value) => moment(value).format("DD MMMM YYYY"),
      sorter: (a, b) => new Date(a.date) - new Date(b.date)
    },
    {
      width: "30%",
      title: "Time",
      dataIndex: "time",
      key: "time",
      render: (value) => appointmentTimeToString(value),
      sorter: (a, b) => parseFloat(a.time) - parseFloat(b.time)
    },
    {
      width: "35%",
      title: "Doctor Name",
      dataIndex: "doctor",
      key: "doctor",
      render: (value) => getFullName(value)
    },
    {
      fixed: "right",
      width: 90,
      title: "Action",
      dataIndex: "key",
      key: "key",
      render: (value, record) => (
        <div className="action-td">
          <Icon
            style={{ fontSize: 16, color: "#08c" }}
            type="eye-o"
            onClick={() =>
              Modal.info({
                title: "Appointment Info",
                content: (
                  <AppointmentInfo
                    doctor={record.doctor}
                    patient={record.patient}
                    date={record.date}
                    time={record.time}
                  />
                )
              })
            }
          />
          <Divider type="vertical" />
          <Popconfirm
            title="Are you sure delete this task?"
            onConfirm={() => onAppointmentDelete(value)}
            onCancel={null}
            okText="Yes"
            cancelText="No"
          >
            <Icon style={{ fontSize: 16, color: "#f04134" }} type="delete" />
          </Popconfirm>
        </div>
      )
    }
  ];

  const getColumns = () => {
    if (width > 600) return columns;
    return [columns[0], columns[1], columns[3]];
  };

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
      if (!filterDate) return patient.uid === user.uid;
      return moment(filterDate).isSame(date, "day") && patient.uid === user.uid;
    });
  };

  return (
    <div className="scheduler">
      <div className="filter">
        <div>
          <span>Filter by date</span>
          <DatePicker
            format="DD MMMM YYYY"
            value={filterDate}
            onChange={(value) => setFilterDate(value)}
          />
        </div>
      </div>
      <div style={{ marginBottom: "6px" }}>
        <Appointment
          onSubmit={onAddAppointmentAdd}
          user={user}
          userList={userList}
          appointmentList={appointmentList}
        />
      </div>
      <Table
        size="middle"
        rowKey="key"
        columns={getColumns()}
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
  appointmentList: PropTypes.array.isRequired,
  onAppointmentDelete: PropTypes.func.isRequired
};

export default Scheduler;
