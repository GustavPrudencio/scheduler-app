import React, { useState } from "react";
import PropTypes from "prop-types";
import { Divider, Input, Button } from "antd";
import "./style.scss";

const ResetPassword = ({ onSignIn, onSubmit }) => {
  const [email, setEmail] = useState("");

  return (
    <div className="reset-password">
      <Input
        id="email"
        placeholder="Email"
        className="input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button type="primary" block onClick={() => onSubmit(email)}>
        Reset
      </Button>
      <Divider />
      <p>
        Already have an account?
        <Button type="link" onClick={onSignIn}>
          Sign in
        </Button>
      </p>
    </div>
  );
};

ResetPassword.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onSignIn: PropTypes.func.isRequired
};

export default ResetPassword;
