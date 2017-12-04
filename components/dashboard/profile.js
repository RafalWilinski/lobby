import {
  Form,
  Select,
  Layout,
  InputNumber,
  Switch,
  Radio,
  Slider,
  Button,
  Upload,
  Icon,
  Input
} from "antd";
import skills from "../../consts/skills";
import topics from "../../consts/topics";
import SkillsDescriptor from "../SkillDescriptor";

const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

let uuid = 0;
const { TextArea } = Input;
const { Header, Content, Footer, Sider } = Layout;

class Profile extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
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
    // can use data-binding to get
    const keys = form.getFieldValue("keys");
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k)
    });
  };

  add = () => {
    uuid++;
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue("keys");
    const nextKeys = keys.concat(uuid);
    // can use data-binding to set
    // important! notify form to detect changes
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
      return <SkillsDescriptor key={k} index={index} form={this.props.form} />;
    });

    return (
      <Layout>
        <Header style={{ background: "#fff", marginLeft: "10px" }}>
          <h1>Edytuj Profil</h1>
        </Header>
        <Content style={{ marginTop: "20px" }}>
          <Form onSubmit={this.handleSubmit}>
            <FormItem {...formItemLayout} label="Imię" hasFeedback>
              {getFieldDecorator("firstName", {
                rules: [
                  { required: true, message: "Podaj Swoje imię, smiało!" }
                ]
              })(<Input placeholder="Adam" />)}
            </FormItem>

            <FormItem {...formItemLayout} label="Naziwsko" hasFeedback>
              {getFieldDecorator("lastName", {
                rules: [
                  { required: true, message: "Podaj Swoje naziwsko, smiało!" }
                ]
              })(<Input placeholder="Kowalski" />)}
            </FormItem>

            <FormItem {...formItemLayout} label="O mnie" hasFeedback>
              {getFieldDecorator("description", {
                rules: [
                  { required: true, message: "Pare słów o sobie nie zaszkodzi" }
                ]
              })(
                <TextArea
                  placeholder="Jestem..."
                  autosize={{ minRows: 5, maxRows: 10 }}
                />
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="Zainteresowania">
              {getFieldDecorator("interests", {
                rules: [
                  {
                    required: true,
                    message:
                      "Wybierz swoje zainteresowania albo przedmioty z których byłes/as dobry.",
                    type: "array"
                  }
                ]
              })(
                <Select mode="multiple" placeholder="Analiza Matematyczna">
                  {topics.map(topic => <Option value={topic}>{topic}</Option>)}
                </Select>
              )}
            </FormItem>

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

            <FormItem {...formItemLayout} label="Zdjęcie Profilowe">
              <div className="dropbox">
                {getFieldDecorator("avatar", {
                  valuePropName: "fileList",
                  getValueFromEvent: this.normFile
                })(
                  <Upload.Dragger name="files" action="/upload.do">
                    <p className="ant-upload-drag-icon">
                      <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">Wrzuc tutaj swoje zdjecie</p>
                  </Upload.Dragger>
                )}
              </div>
            </FormItem>

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