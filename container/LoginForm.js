import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { Form, Icon, Input, Button, Checkbox } from "antd";

import LoginForm from "../components/LoginForm";

class LoginFormContainer extends Component {
  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  render() {
    return <LoginForm handleSubmit={this.handleSubmit} />;
  }
}

const WrappedLoginForm = Form.create()(LoginFormContainer);

export default WrappedLoginForm;
