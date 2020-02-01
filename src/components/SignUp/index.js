import React, { useState } from "react";
import PropTypes from "prop-types";
import { Divider, Select, Input, Button } from "antd";
import "./style.scss";

const { Option } = Select;

const SignUp = ({ onSignIn, onSignUp }) => {
  const [state, setState] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    type: "patient"
  });

  const onChange = (key, value) => {
    setState({ ...state, [key]: value });
  };

  const handleOnSignUp = () => {
    onSignUp(state);
  };

  return (
    <div className="sign-up">
      <h2>DOCTOR SCHEDULER</h2>
      <Input
        className="input"
        id="username"
        placeholder="Username"
        value={state.username}
        onChange={e => onChange("username", e.target.value)}
      />
      <Input
        className="input"
        id="email"
        placeholder="Email"
        value={state.email}
        onChange={e => onChange("email", e.target.value)}
      />
      <Input.Password
        className="input"
        id="password"
        placeholder="Password"
        value={state.password}
        onChange={e => onChange("password", e.target.value)}
      />
      <Input
        className="input"
        id="firstname"
        placeholder="First name"
        value={state.firstname}
        onChange={e => onChange("firstname", e.target.value)}
      />
      <Input
        className="input"
        id="lastname"
        placeholder="Last name"
        value={state.lastname}
        onChange={e => onChange("lastname", e.target.value)}
      />
      <Select
        className="select"
        defaultValue={state.type}
        onChange={value => onChange("type", value)}
      >
        <Option value="doctor">Doctor</Option>
        <Option value="patient">Patient</Option>
      </Select>
      <Button block type="primary" onClick={handleOnSignUp}>
        SIGN UP
      </Button>
      <Divider />
      <p>
        Already have an account?
        <Button type="link" block onClick={onSignIn}>
          Sign in
        </Button>
      </p>
    </div>
  );
};

SignUp.propTypes = {
  onSignIn: PropTypes.func.isRequired,
  onSignUp: PropTypes.func.isRequired
};

export default SignUp;
