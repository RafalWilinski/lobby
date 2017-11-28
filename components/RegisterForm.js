import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete
} from "antd";
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: []
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);

        this.props.register(values.email, values.password);
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
      <Form onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label="E-mail" hasFeedback>
          {getFieldDecorator("email", {
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
        <FormItem {...formItemLayout} label="Hasło" hasFeedback>
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
        <FormItem {...formItemLayout} label="Potwierdz hasło" hasFeedback>
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

        <FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
          {getFieldDecorator("agreement", {
            valuePropName: "checked"
          })(
            <Checkbox>
              Przeczytałem warunki umowy <a href="">umowy</a>
            </Checkbox>
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Zarejestruj
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

export default WrappedRegistrationForm;
