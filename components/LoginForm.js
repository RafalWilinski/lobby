import React, { Component } from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import Head from "./Head.js";
import HWCenterWrapper from "../components/HVCenterWrapper";

const FormItem = Form.Item;

class LoginForm extends Component {
  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);

        this.props.login(values.email, values.password);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form
        onSubmit={this.handleSubmit}
        className="login-form"
        style={{ maxWidth: "280px" }}
      >
        <FormItem>
          {getFieldDecorator("email", {
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
          <a className="login-form-forgot" href="">
            Zapomniałam/em hasła
          </a>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Zaloguj
          </Button>
          Lub <a href="">Zarejestruj sie!</a>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(LoginForm);
