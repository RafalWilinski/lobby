import {
  Form,
  Select,
  Layout,
  Button,
  Upload,
  Icon,
  Input,
  Spin,
  notification
} from "antd";
import axios from "axios";
import SkillsDescriptor from "../SkillDescriptor";

const FormItem = Form.Item;
const Option = Select.Option;

const { TextArea } = Input;
const { Header, Content, Footer, Sider } = Layout;

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      branches: [],
      user: {}
    };
    this.skillDescriptor = [];
  }

  componentDidMount() {
    axios.get("/api/branches").then(payload => {
      this.setState({
        branches: payload.data.branches
      });
    });

    this.setState({user: JSON.parse(localStorage.getItem("user")).user});
    this.props.getMyBranches(JSON.parse(localStorage.getItem("user")).user.login);
    this.props.getMySkills(JSON.parse(localStorage.getItem("user")).user.login)
      .then(() => {
        this.props.form.setFieldsValue({
          keys: this.props.mySkills.data
        });
      });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.success) {
      setTimeout(() => {
        notification.open({
          message: "Sukces!",
          description: "Profil zaktualizowany!",
          duration: 3.0,
          icon: <Icon type="smile-circle" style={{ color: "#108ee9" }} />
        });
      }, 100);
    } else if (nextProps.error) {
      message.error("Nie udało się zaktualizować profilu.");
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const user = {
        firstName: values.firstName,
        lastName: values.lastName,
        studentId: values.studentId,
        description: values.description,
        branches: values.interests,
        skills: this.skillDescriptor.map(sd => sd.state),
        login: JSON.parse(localStorage.getItem("user")).user.login
      };
      if (!err) {
        this.props.updateUser(user);
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
    const { form, pageType } = this.props;
    const keys = form.getFieldValue("keys");
    const nextKeys = keys.concat(newKey);
    form.setFieldsValue({
      keys: nextKeys
    });
  };

  render() {
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

    getFieldDecorator("keys", { initialValue: [] });
    const keys = getFieldValue("keys");

    const formItems = keys.map((k, index) => {
      return <SkillsDescriptor 
        ref={(e) => { if(e) { this.skillDescriptor[index] = e; } } } onRemove={this.remove.bind(this, index)}
        skillName={k.skillName} priority={Number(k.priority)} key={index} index={index} pageType={0} form={this.props.form} 
      />;
    });

    return (
      <Layout>
        <Header style={{ background: "#fff", paddingLeft: "20px" }}>
          <h1>Edytuj Profil</h1>
        </Header>
        <Content style={{ marginTop: "20px" }}>
          <Form onSubmit={this.handleSubmit}>
            <FormItem {...formItemLayout} label="Imię" hasFeedback>
              {getFieldDecorator("firstName", {
                rules: [
                  { required: true, message: "Podaj Swoje imię, smiało!" }
                ], initialValue: this.state.user.firstName
              })(<Input placeholder="Adam" />)}
            </FormItem>

            <FormItem {...formItemLayout} label="Naziwsko" hasFeedback>
              {getFieldDecorator("lastName", {
                rules: [
                  { required: true, message: "Podaj Swoje naziwsko, smiało!" }
                ], initialValue: this.state.user.lastName
              })(<Input placeholder="Kowalski" />)}
            </FormItem>

            <FormItem {...formItemLayout} label="Nr indeksu" hasFeedback>
              {getFieldDecorator("studentId", {
                rules: [
                  { required: true, message: "Podaj Swój numer indeksu, smiało!" }
                ], initialValue: this.state.user.studentId
              })(<Input placeholder="122521" />)}
            </FormItem>

            <FormItem {...formItemLayout} label="O mnie" hasFeedback>
              {getFieldDecorator("description", {
                rules: [
                  { message: "Pare słów o sobie nie zaszkodzi" }
                ], initialValue: this.state.user.description
              })(
                <TextArea
                  placeholder="Jestem..."
                  autosize={{ minRows: 5, maxRows: 10 }}
                />
              )}
            </FormItem>

            {this.props.isLoading || !this.props.myBranches ? (
              <Spin />
            ) : (
              <FormItem {...formItemLayout} label="Zainteresowania">
                {getFieldDecorator("interests", {
                  rules: [
                    {
                      required: true,
                      message: "Wybierz swoje zainteresowania albo przedmioty z których byłes/as dobry.",
                      type: "array"
                    }
                  ], initialValue: this.props.myBranches.data.map(myBranch => myBranch.branchName)
                })(
                  <Select mode="multiple" placeholder="Analiza Matematyczna" notFoundContent="Brak wyników" 
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                  }>
                    {this.state.branches.map(branch => ( <Select.Option value={branch.name} key={branch.name}>{branch.name}</Select.Option>))}
                  </Select>
                )}
              </FormItem>
            )}

            <FormItem {...formItemLayout} label="Twoje umiejętnosci">
              <span className="ant-form-text">Pokaz w czym jestes dobry!</span>
            </FormItem>
            {formItems}

            {getFieldValue("keys").length < 5 && (
              <FormItem {...formItemLayoutWithOutLabel}>
                <Button
                  type="dashed"
                  onClick={this.add}
                  style={{ width: "80%" }}
                >
                  <Icon type="plus" /> Dodaj Umiejetnosc
                </Button>
              </FormItem>
            )}

            <FormItem wrapperCol={{ span: 12, offset: 4 }}>
              <Button type="primary" htmlType="submit">
                Zapisz
              </Button>
            </FormItem>
          </Form>
        </Content>
      </Layout>
    );
  }
}

const WrappedNewProfileForm = Form.create()(Profile);

export default WrappedNewProfileForm;
