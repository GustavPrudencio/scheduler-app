import React from "react";
import { Spin } from "antd";
import "./style.scss";

const LoadingPage = () => {
  return (
    <div className="wrap-loading-page">
      <Spin size="large" tip="Loading.." />
    </div>
  );
};

export default LoadingPage;
