import React, { Component } from "react";
import { Form, Icon, Input, Button, Checkbox, Alert } from "antd";
import Link from "next/link";
import Router from "next/router";
import Head from "./Head.js";
import HWCenterWrapper from "../components/HVCenterWrapper";

const FormItem = Form.Item;

class LoginForm extends Component {
  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.login(values.login, values.password);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    if (this.props.success) {
      Router.push({
        pathname: "/dashboard"
      });
    }

    return (
      <Form
        onSubmit={this.handleSubmit}
        className="login-form"
        style={{ maxWidth: "280px" }}
      >
        <FormItem>
          {getFieldDecorator("login", {
            rules: [{ required: true, message: "Proszę podac email!" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ fontSize: 13 }} />}
              placeholder="Email"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Proszę podac hasło!" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
              type="password"
              placeholder="Hasło"
            />
          )}
        </FormItem>
        <FormItem>
          <a className="login-form-forgot" href="" style={{ float: "left" }}>
            Zapomniałam/em hasła
          </a>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ width: "100%" }}
          >
            Zaloguj
          </Button>
          <Link href="/register">Zarejestruj sie!</Link>
        </FormItem>
        {this.props.error && (
          <Alert message={this.props.error.message} type="error" showIcon />
        )}
      </Form>
    );
  }
}

export default Form.create()(LoginForm);
