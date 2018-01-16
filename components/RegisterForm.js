import {
  Select,
  Form,
  Input,
  Checkbox,
  Button,
  Alert,
  Icon,
  Modal,
  message
} from "antd";
import Link from "next/link";
import Router from "next/router";
import axios from "axios";
import skills from "../consts/skills";
import topics from "../consts/topics";
import SkillsDescriptor from "../components/SkillDescriptor";

const FormItem = Form.Item;

function info() {
  Modal.info({
    title: 'Umowa',
	okText: 'OK',
    content: (
      <div>
        <p>1. Warunek 1</p>
        <p>2. Warunek 2</p>
      </div>
    ),
    onOk() {},
  });
}

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: []
  };

  constructor(props) {
    super(props);
    this.state = {
      branches: []
    };
  }

  componentDidMount() {
    axios.get("/api/branches").then(payload => {
      this.setState({
        branches: payload.data.branches
      });
    });
    this.skillDescriptor = [];
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      const user = {
        login: values.login,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
        studentId: values.studentId,
        branches: values.interests,
        skills: this.skillDescriptor.map(sd => sd.state)
      };

      if (!err) {
        this.props.register(user);
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
      callback("Wprowadzone hasła różnią się od siebie!");
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

  remove = index => {
    const { form } = this.props;
    const keys = form.getFieldValue("keys");
    if (keys.length === 1) {
      return;
    }
    
    keys.splice(index, 1);
    this.skillDescriptor = [];

    form.setFieldsValue({ keys });
  };

  add = () => {
    const newKey = {skillName: '', priority: 1};
    const { form } = this.props;
    const keys = form.getFieldValue("keys");
    const nextKeys = keys.concat(newKey);
    form.setFieldsValue({
      keys: nextKeys
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.success) {
      Router.push({
        pathname: "/dashboard",
        query: {
          success: "register"
        }
      });
    } else if (nextProps.error) {
      message.error("Nie udało się zarejestrować użytkownika.");
    }
  }

  render() {
    const {
      getFieldDecorator,
      getFieldValue,
      formItemLayoutWithOutLabel
    } = this.props.form;
    const { autoCompleteResult } = this.state;
    const { key, index } = this.props;

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

    getFieldDecorator("keys", { initialValue: [] });
    const keys = getFieldValue("keys");

    const formItems = keys.map((k, index) => {
      return <SkillsDescriptor 
        ref={(e) => { if(e) { this.skillDescriptor[index] = e; } } } onRemove={this.remove.bind(this, index)}
        skillName={k.skillName} priority={Number(k.priority)} key={index} index={index} form={this.props.form} 
      />;
    });

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
        <FormItem
          {...formItemLayout}
          style={{ width: "350px" }}
          label="Zainteresowania"
        >
          {getFieldDecorator("interests", {
            rules: [
              {
                required: true,
                message: "Wybierz swoje zainteresowania albo przedmioty z których byłes/as dobry.",
                type: "array"
              }
            ]
          })(
            <Select mode="multiple"  placeholder="Analiza Matematyczna" notFoundContent="Brak wyników" 
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
            }>
              {this.state.branches.map(branch => (
                <Select.Option value={branch.name} key={branch.name}>
                  {branch.name}
                </Select.Option>
              ))}
            </Select>
          )}
        </FormItem>

        <FormItem {...headItemLayout}>
          <h2 align="center">Twoje umiejętnosci</h2>
          <h4 align="center">Pokaz w czym jestes dobry!</h4>
        </FormItem>
        {formItems}

        {
          <FormItem {...tailFormItemLayout} style={{ width: "350px" }}>
            <Button type="dashed" onClick={this.add} style={{ width: "100%" }}>
              <Icon type="plus" /> Dodaj Umiejetnosc
            </Button>
          </FormItem>
        }

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
			 Przeczytałem warunki <a href="#" onClick={info}>umowy</a>
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
