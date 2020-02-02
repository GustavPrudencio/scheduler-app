import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Input, Select, Button } from "antd";
import "./style.scss";

const { Option } = Select;

const Account = ({ user, onSubmit }) => {
  const [state, setState] = useState(user);

  useEffect(() => {
    setState(user);
  }, [user]);

  const onChange = (key, value) => {
    setState({ ...state, [key]: value });
  };

  const handleOnSubmit = () => {
    onSubmit(state);
  };

  const { username, email, firstname, lastname, type } = state;

  return (
    <div className="wrap-account">
      <div className="account">
        <h2>User infomation</h2>
        <Input
          size="large"
          className="input"
          placeholder="username"
          value={username}
          onChange={(e) => onChange("username", e.target.value)}
        />
        <Input
          size="large"
          className="input"
          placeholder="email"
          value={email}
          onChange={(e) => onChange("email", e.target.value)}
        />
        <Input
          size="large"
          className="input"
          placeholder="firstname"
          value={firstname}
          onChange={(e) => onChange("firstname", e.target.value)}
        />
        <Input
          size="large"
          className="input"
          placeholder="lastname"
          value={lastname}
          onChange={(e) => onChange("lastname", e.target.value)}
        />
        <Select className="select" value={type} disabled>
          <Option selected value="doctor">
            Doctor
          </Option>
          <Option value="patient">Patient</Option>
        </Select>
        <Button block type="primary" onClick={handleOnSubmit}>
          Save Changes
        </Button>
      </div>
    </div>
  );
};

Account.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  }).isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default Account;
