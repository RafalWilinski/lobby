import { Select, Form, Input, Icon, Row, Col, Checkbox, Button, Alert } from "antd";
import Link from "next/link";
import skills from "../consts/skills";
import topics from "../consts/topics";

const FormItem = Form.Item;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: []
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
	const user = {
		login: values.login,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
        studentId: values.studentId,
	}
	const userbranch = {
		userLogin: values.login,
		branchName: values.interests
	}
      if (!err) {
        this.props.register(user, userbranch);
      }
    });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const headItemLayout = {
      labelCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 0
        }
      }
    };

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

    return (
      <Form onSubmit={this.handleSubmit} style={{ width: "450px" }}>
        <FormItem {...headItemLayout}>
          <h1 align="center">Szukasz tematu pracy inżynierskiej?</h1>
          <h1 align="center">Pomożemy Ci!</h1>
          <h4 align="center">Ale najpierw powiedz coś o sobie</h4>
        </FormItem>
        <FormItem
          {...formItemLayout}
          style={{ width: "350px" }}
          label="Imię"
          hasFeedback
        >
          {getFieldDecorator("firstName", {
            rules: [
              {
                required: true,
                message: "Wprowadź imię"
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          style={{ width: "350px" }}
          label="Nazwisko"
          hasFeedback
        >
          {getFieldDecorator("lastName", {
            rules: [
              {
                required: true,
                message: "Wprowadź nazwisko"
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          style={{ width: "350px" }}
          label="Nr indeksu"
          hasFeedback
        >
          {getFieldDecorator("studentId", {
            rules: [
              {
                required: true,
                message: "Wprowadź nr indeksu"
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          style={{ width: "350px" }}
          label="E-mail"
          hasFeedback
        >
          {getFieldDecorator("login", {
            rules: [
              {
                type: "email",
                message: "Niepoprawny e-mail"
              },
              {
                required: true,
                message: "Proszę wprowadz email"
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          style={{ width: "350px" }}
          label="Hasło"
          hasFeedback
        >
          {getFieldDecorator("password", {
            rules: [
              {
                required: true,
                message: "Wprowadz hasło"
              },
              {
                validator: this.checkConfirm
              }
            ]
          })(<Input type="password" />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          style={{ width: "350px" }}
          label="Potwierdz hasło"
          hasFeedback
        >
          {getFieldDecorator("confirm", {
            rules: [
              {
                required: true,
                message: "Potwierdz hasło!"
              },
              {
                validator: this.checkPassword
              }
            ]
          })(<Input type="password" onBlur={this.handleConfirmBlur} />)}
        </FormItem>
		<FormItem {...formItemLayout} style={{ width: "350px" }} label="Zainteresowania">
              {getFieldDecorator("interests", {
                rules: [
                  {
                    required: true,
                    message: "Wybierz swoje zainteresowania albo przedmioty z których byłes/as dobry.",
                    //type: "array"
                  }
                ]
              })(
                <Select>
                  {topics.map(topic => <Option value={topic}>{topic}</Option>)}
                </Select>
              )}
            </FormItem>

        <FormItem
          {...tailFormItemLayout}
          style={{ marginBottom: 8, width: "350px" }}
        >
          {getFieldDecorator("agreement", {
            valuePropName: "checked",
            rules: [
              {
                required: true,
                message: "Zaakceptuj umowę!"
              }
            ]
          })(
            <Checkbox>
              Przeczytałem warunki <a href="">umowy</a>
            </Checkbox>
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout} style={{ width: "350px" }}>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Zarejestruj
          </Button>
          <Link href="/login">Masz Konto? Zaloguj sie!</Link>
        </FormItem>
        {this.props.error && (
          <Alert message={this.props.error.message} type="error" showIcon />
        )}
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

export default WrappedRegistrationForm;
