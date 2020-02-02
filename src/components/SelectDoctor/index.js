import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Select } from "antd";
import "./style.scss";

const { Option } = Select;

const SelectDoctor = ({ users, onChange, value, className }) => {
  const [doctor, setDoctor] = useState([]);

  useEffect(() => {
    setDoctor(users.filter((user) => user.type === "doctor"));
  }, [users]);

  return (
    <Select
      className={`select-doctor ${className}`}
      value={value}
      onChange={onChange}
    >
      {doctor.map((doc) => (
        <Option key={doc.uid} value={doc.uid}>
          {`${doc.firstname} ${doc.lastname}`}
        </Option>
      ))}
    </Select>
  );
};

SelectDoctor.propTypes = {
  users: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired
};

export default SelectDoctor;
