import React, { useState } from "react";
import PropTypes from "prop-types";
import { Divider, Input, Button, Row, Col } from "antd";
import "./style.scss";

const SignIn = ({ onSignIn, onSignUp }) => {
  const [state, setState] = useState({
    email: "",
    password: ""
  });

  const onChange = (key, value) => {
    setState({ ...state, [key]: value });
  };

  const handleOnSignIn = () => {
    onSignIn(state);
  };

  return (
    <div className="sign-in">
      <Input
        id="email"
        placeholder="Email"
        className="input"
        value={state.email}
        onChange={(e) => onChange("email", e.target.value)}
      />
      <Input.Password
        id="password"
        placeholder="Password"
        className="input"
        value={state.password}
        onChange={(e) => onChange("password", e.target.value)}
      />
      <Row>
        <Col span={12}>
          <Button type="link" onClick={handleOnSignIn}>
            Forget password ?
          </Button>
        </Col>
        <Col span={12}>
          <Button block type="primary" onClick={handleOnSignIn}>
            SIGN IN
          </Button>
        </Col>
      </Row>
      <Divider />
      <p>
        Don&apos;t have an account?
        <Button type="link" block onClick={onSignUp}>
          Sign up
        </Button>
      </p>
    </div>
  );
};

SignIn.propTypes = {
  onSignIn: PropTypes.func.isRequired,
  onSignUp: PropTypes.func.isRequired
};

export default SignIn;
