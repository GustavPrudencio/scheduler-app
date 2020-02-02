import React, { useState } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Icon, Layout, Menu, Modal } from "antd";
import firebase from "../../firebase";
import { logout, setLogInUser } from "../../actions/authen";
import { noti } from "../../helper";
import Account from "../Account";
import Scheduler from "../Scheduler";
import LoadingPage from "../LoadingPage";
import "./style.scss";
import appLogo from "../../static/img/medical-logo-2.jpg";

const { Header, Content, Sider } = Layout;

const mapStateToProps = (state) => {
  return {
    currentUser: state.authen.user,
    userList: state.firebase.users,
    appointmentList: state.firebase.appointments
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ logout, setLogInUser }, dispatch)
  };
};

const Console = ({ actions, currentUser, userList, appointmentList }) => {
  const [content, setContent] = useState("scheduler");

  /**
   * On logout submit
   */
  const onSignOut = () => {
    firebase
      .auth()
      .signOut()
      .catch((err) => {
        if (err) {
          const { message } = err;
          noti.error({ description: message });
        } else {
          actions.logout();
        }
      });
  };

  /**
   * on edit addcount infomation submit
   * @param {User} data user object
   */
  const onEditAccount = (data) => {
    const { uid } = data;
    firebase
      .database()
      .ref(`users/${uid}`)
      .set(data, (err) => {
        if (err) noti.error({ description: err.message });
        else {
          noti.success({ message: "User information updated" });
          firebase
            .database()
            .ref("users")
            .child(uid)
            .once("value", (snap) => {
              if (snap) actions.setLogInUser(snap.val());
            });
        }
      });
  };

  /**
   * confirm on logout click
   */
  const confirmSignOut = () => {
    return Modal.confirm({
      title: "Confirm",
      content: "You are going to sign out?",
      okText: "Sign out",
      cancelText: "Cancel",
      onOk: onSignOut
    });
  };

  /**
   * Delete Appointment child by appointment's key
   * @param {String} key Appointment's key
   */
  const handleonDeleteAppointmentByKey = (key) => {
    firebase
      .database()
      .ref(`appointments/${key}`)
      .set(null, (err) => {
        if (err) noti.error({ description: err.message });
        else noti.success({ message: "Deleted" });
      });
  };

  /**
   * handle on menu click
   * @param {Object} param[key] in ['1','2','3']
   */
  const handleOnMenuClick = ({ key }) => {
    switch (key) {
      case "1":
        setContent("account");
        break;
      case "2":
        setContent("scheduler");
        break;
      case "3":
        confirmSignOut();
        break;
      default:
        break;
    }
  };

  const renderContent = () => {
    if (content === "account") {
      return <Account user={currentUser} onSubmit={onEditAccount} />;
    }
    return (
      <Scheduler
        user={currentUser}
        userList={userList}
        appointmentList={appointmentList}
        onAppointmentDelete={handleonDeleteAppointmentByKey}
      />
    );
  };

  if (isEmpty(currentUser.uid)) return <LoadingPage />;

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider theme="light" breakpoint="lg" collapsedWidth="0">
        <div className="logo">
          <img src={appLogo} alt="app-logo" />
          <p>Doctor Scheduler App</p>
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["2"]}
          onClick={handleOnMenuClick}
        >
          <Menu.Item key="1">
            <Icon type="user" />
            <span className="nav-text">My Account</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="calendar" />
            <span className="nav-text">Scheduler</span>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="logout" />
            <span className="nav-text">Sign Out</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: "#1890ff", padding: 0 }}>
          <h3 style={{ paddingLeft: "2rem", color: "white" }}>
            {content.toUpperCase()}
          </h3>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
            {renderContent()}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

Console.propTypes = {
  actions: PropTypes.shape({
    logout: PropTypes.func.isRequired,
    setLogInUser: PropTypes.func.isRequired
  }).isRequired,
  currentUser: PropTypes.shape().isRequired,
  userList: PropTypes.array.isRequired,
  appointmentList: PropTypes.array.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Console);
