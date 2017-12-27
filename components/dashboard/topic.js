import {
  Form,
  Select,
  Layout,
  Alert,
  InputNumber,
  Switch,
  Radio,
  Slider,
  Button,
  Upload,
  Icon,
  Input,
  message
} from "antd";
import Router from "next/router";
import axios from "axios";
import skills from "../../consts/skills";
import topics from "../../consts/topics";
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

let uuid = 0;
const { TextArea } = Input;
const { Header, Content, Footer, Sider } = Layout;

class Topic extends React.Component {
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

  componentWillReceiveProps(nextProps) {
    if (this.props.isLoading) {
      if (!nextProps.isLoading && !nextProps.error) {
        Router.push({
          pathname: "/dashboard",
          query: {
            success: "thesis"
          }
        });
      } else if (nextProps.error) {
        message.error("Nie udało się utworzyć tematu.");
      }
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      const roles = [];
      console.log(values.roleDesc, values.roleName, values.roleSkills);

      values.roleName.filter(x => !!x).forEach((roleName, index) => {
        roles[index] = {
          name: roleName,
          description: values.roleDesc.filter(x => !!x)[index],
          skills: values.roleSkills.filter(x => !!x)[index],
          capitan: index === 0,
          userLogin:
            index === 0
              ? JSON.parse(localStorage.getItem("user")).user.login
              : undefined
        };
      });

      const thesis = {
        name: values.name,
        description: values.description,
        public: values.public,
        branches: values.relatives
      };

      if (!err) {
        this.props.create(thesis, roles);
      } else {
        message.error("Popraw błędy w formularzu");
      }
    });
  };

  normFile = e => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  remove = k => {
    const { form } = this.props;
    const roles = form.getFieldValue("roles");

    if (roles.length === 1) {
      return;
    }

    form.setFieldsValue({
      roles: roles.filter(key => key !== k)
    });
  };

  add = () => {
    uuid++;
    const { form } = this.props;
    const roles = form.getFieldValue("roles");
    const nextRoles = roles.concat(uuid);

    form.setFieldsValue({
      roles: nextRoles
    });
  };

  render() {
    console.log(this.props);

    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 }
      }
    };

    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 14, offset: 4 }
      }
    };

    getFieldDecorator("roles", { initialValue: [] });
    const roles = getFieldValue("roles");

    const formItems = roles.map((k, index) => {
      return (
        <div key={k}>
          <FormItem
            {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
            label={index === 0 ? "Kapitan (Ty)" : ""}
            required={true}
          >
            {getFieldDecorator(`roleName[${k}]`, {
              validateTrigger: ["onChange", "onBlur"],
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: "Proszę podaj nazwe stanowiska"
                }
              ]
            })(
              <Input
                placeholder="Nazwa Stanowiska"
                style={{ width: "80%", marginRight: 8 }}
              />
            )}
            {roles.length > 1 ? (
              <Icon
                className="dynamic-delete-button"
                type="minus-circle-o"
                disabled={roles.length === 1}
                onClick={() => this.remove(k)}
              />
            ) : null}
          </FormItem>
          <FormItem
            {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
            label={index === 0 ? "Opis Stanowiska" : ""}
            required={true}
          >
            {getFieldDecorator(`roleDesc[${k}]`, {
              validateTrigger: ["onChange", "onBlur"],
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: "Proszę podaj opis stanowiska"
                }
              ]
            })(
              <TextArea
                placeholder="Jako ... Twoja rola będzie polegała na..."
                autosize={{ minRows: 3, maxRows: 7 }}
                style={{ width: "80%", marginRight: 8 }}
              />
            )}
          </FormItem>
          <FormItem
            {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
            label={index === 0 ? "Wymagane Umiejętnosci" : ""}
            required={true}
          >
            {getFieldDecorator(`roleSkills[${k}]`, {
              rules: [
                {
                  required: true,
                  message: "Wybierz potrzebne umiejętnosci",
                  type: "array"
                }
              ]
            })(
              <Select
                mode="multiple"
                placeholder="Wybierz wymagane umiejetnosci"
                style={{ width: "80%", marginRight: 8 }}
              >
                {this.state.skills.map(skill => (
                  <Option value={skill.name} key={skill.name}>
                    {skill.name}
                  </Option>
                ))}
              </Select>
            )}
          </FormItem>
        </div>
      );
    });

    return (
      <Layout>
        <Header style={{ background: "#fff", paddingLeft: "20px" }}>
          <h1>Utwórz swój temat</h1>
        </Header>
        <Content style={{ marginTop: "20px" }}>
          <Form onSubmit={this.handleSubmit}>
            <FormItem {...formItemLayout} label="Temat Pracy" hasFeedback>
              {getFieldDecorator("name", {
                rules: [
                  { required: true, message: "Proszę podaj nazwę tematu" }
                ]
              })(
                <Input placeholder="Przetwarzanie Obrazu za pomocą biblioteki OpenCV" />
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="Opis Tematu" hasFeedback>
              {getFieldDecorator("description", {
                rules: [{ required: true, message: "Proszę dodaj krótki opis" }]
              })(
                <TextArea
                  placeholder="Temat polega na..."
                  autosize={{ minRows: 5, maxRows: 15 }}
                />
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="Zagadnienie/a">
              {getFieldDecorator("relatives", {
                rules: [
                  {
                    required: true,
                    message: "Wybierz zagadnienia pokrewne",
                    type: "array"
                  }
                ]
              })(
                <Select
                  mode="multiple"
                  placeholder="Wybierz zagadnienia pokrewne"
                >
                  {this.state.branches.map(branch => (
                    <Option value={branch.name} key={branch.name}>
                      {branch.name}
                    </Option>
                  ))}
                </Select>
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="Publiczny?"
              extra="Niektórzy nie chcą ujawniac tematów swoich prac publicznie. Aplikujący otrzyma pełne szczegóły dopiero po aplikacji"
            >
              {getFieldDecorator("public", { valuePropName: "checked" })(
                <Switch />
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="Stanowiska">
              <span className="ant-form-text">
                Napisz kogo potrzebujesz w zespole aby dobrze zrealizowac swoj
                temat
              </span>
            </FormItem>
            {formItems}

            {getFieldValue("roles").length < 5 && (
              <FormItem {...formItemLayoutWithOutLabel}>
                <Button
                  type="dashed"
                  onClick={this.add}
                  style={{ width: "80%" }}
                >
                  <Icon type="plus" /> Dodaj wakat
                </Button>
              </FormItem>
            )}

            <FormItem {...formItemLayout} label="Załączniki">
              <div className="dropbox">
                {getFieldDecorator("dragger", {
                  valuePropName: "fileList",
                  getValueFromEvent: this.normFile
                })(
                  <Upload.Dragger name="files" action="/upload.do">
                    <p className="ant-upload-drag-icon">
                      <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">
                      Przeciagnij pliki tutaj aby dołączyc je do tematu
                    </p>
                    <p className="ant-upload-hint">
                      Mozesz wrzucic jeden lub pare plików. Moga byc to jakies
                      rysunki podgladowe, szkice projektu, artykuly czy
                      cokolwiek innego
                    </p>
                  </Upload.Dragger>
                )}
              </div>
            </FormItem>

            <FormItem wrapperCol={{ span: 12, offset: 4 }}>
              {this.props.form.getFieldValue("roles").length < 1 && (
                <Alert
                  message="Musisz dodać przynajmniej jeden wakat"
                  type="warning"
                  showIcon
                />
              )}
              <Button
                type="primary"
                htmlType="submit"
                disabled={this.props.form.getFieldValue("roles").length < 1}
              >
                Utwórz
              </Button>
            </FormItem>
          </Form>
        </Content>
      </Layout>
    );
  }
}

const WrappedNewTopicForm = Form.create()(Topic);

export default WrappedNewTopicForm;
