import {
  Select,
  Form,
  Input,
  Icon,
  Row,
  Col,
  Checkbox,
  Button,
  Alert,
  Rate,
  Modal
} from "antd";
import Link from "next/link";
import axios from "axios";
import skills from "../consts/skills";
import topics from "../consts/topics";
import SkillsDescriptor from "../components/SkillDescriptor";

const FormItem = Form.Item;

let uuid = 0;

function info() {
  Modal.info({
    title: "Umowa",
    okText: "OK",
    content: (
      <div>
        <p>1. Warunek 1</p>
        <p>2. Warunek 2</p>
      </div>
    ),
    onOk() {}
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
      skills: [],
      branches: []
    };
  }

  componentDidMount() {
    axios.get("/api/skills").then(payload => {
      this.setState({
        skills: payload.data.skills
      });
    });

    axios.get("/api/branches").then(payload => {
      this.setState({
        branches: payload.data.branches
      });
    });
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
        branches: values.interests
      };

      const userSkills = [];

      values.skillname.filter(x => !!x).forEach((skillname, index) => {
        userSkills[index] = {
          skillName: skillname,
          userLogin: values.login,
          priority: 1 //values.skillvalue.filter(x => !!x)[index]
        };
      });

      if (!err) {
        this.props.register(user, userSkills);
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

  add = () => {
    uuid++;
    const { form } = this.props;
    const userSkills = form.getFieldValue("userSkills");
    const nextUserSkills = userSkills.concat(uuid);
    form.setFieldsValue({
      userSkills: nextUserSkills
    });
  };

  remove = k => {
    const { form } = this.props;
    const userSkills = form.getFieldValue("userSkills");

    if (userSkills.length === 0) {
      return;
    }

    form.setFieldsValue({
      userSkills: userSkills.filter(key => key !== k)
    });
  };

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

    getFieldDecorator("userSkills", { initialValue: [] });
    const userSkills = getFieldValue("userSkills");

    const formItems = userSkills.map((k, index) => {
      return (
        <div key={k}>
          <FormItem
            required={true}
            {...formItemLayout}
            label={"Umiejętnosc"}
            style={{ marginBottom: "10px", width: "350px" }}
          >
            {getFieldDecorator(`skillname[${k}]`, {
              //validateTrigger: ["onChange", "onBlur"],
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: "Proszę podaj umiejętność"
                }
              ]
            })(
              <Select
                showSearch
                //style={{ width: "350px" }}
                placeholder="Wybierz umiejętność"
                notFoundContent="Brak wyników"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {this.state.skills.map(skill => (
                  <Option value={skill.name} key={skill.name}>
                    {skill.name}
                  </Option>
                ))}
              </Select>
            )}

            {userSkills.length > 0 ? (
              <Icon
                className="dynamic-delete-button"
                type="minus-circle-o"
                disabled={userSkills.length === 0}
                onClick={() => this.remove(k)}
              />
            ) : null}
          </FormItem>

          <FormItem
            required={true}
            {...formItemLayout}
            label={"Stopień Zaawansowania"}
            style={{ width: "350px" }}
          >
            {getFieldDecorator(`skillvalue[${k}]`, {
              validateTrigger: ["onChange", "onBlur"],
              rules: [
                {
                  //required: true,
                  whitespace: true,
                  message: "Podaj stopień zaawansowania"
                }
              ]
            })(
              <span>
                <Rate />
              </span>
            )}
          </FormItem>
        </div>
      );
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
                //required: true,
                //message:
                //  "Wybierz swoje zainteresowania albo przedmioty z których byłes/as dobry.",
                type: "array"
              }
            ]
          })(
            <Select mode="multiple" notFoundContent="Brak wyników">
              {this.state.branches.map(branch => (
                <Option value={branch.name} key={branch.name}>
                  {branch.name}
                </Option>
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
              Przeczytałem warunki{" "}
              <a href="#" onClick={info}>
                umowy
              </a>
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
