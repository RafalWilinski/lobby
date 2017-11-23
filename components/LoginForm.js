import { Form, Icon, Input, Button, Checkbox } from "antd";
import Head from "./Head.js";
import HWCenterWrapper from "../components/HVCenterWrapper";

const FormItem = Form.Item;

const LoginForm = props => {
  const { getFieldDecorator } = this.props.form;

  return (
    <Form
      onSubmit={this.props.handleSubmit}
      className="login-form"
      style={{ maxWidth: "280px" }}
    >
      <FormItem>
        {getFieldDecorator("userName", {
          rules: [{ required: true, message: "Please input your username!" }]
        })(
          <Input
            prefix={<Icon type="user" style={{ fontSize: 13 }} />}
            placeholder="Email"
          />
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator("password", {
          rules: [{ required: true, message: "Please input your Password!" }]
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
        <Button type="primary" htmlType="submit" className="login-form-button">
          Zaloguj
        </Button>
        Lub <a href="">Zarejestruj sie!</a>
      </FormItem>
    </Form>
  );
};

export default LoginForm;
