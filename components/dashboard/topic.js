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
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

let uuid = 0;
const { TextArea } = Input;
const { Header, Content, Footer, Sider } = Layout;

class Topic extends React.Component {
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
        sm: { span: 12 }
      }
    };

    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 }
      }
    };

    getFieldDecorator("keys", { initialValue: [] });
    const keys = getFieldValue("keys");

    const formItems = keys.map((k, index) => {
      return (
        <FormItem
          {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
          label={index === 0 ? "Członkowie Druzyny" : ""}
          required={false}
          key={k}
        >
          {getFieldDecorator(`names-${k}`, {
            validateTrigger: ["onChange", "onBlur"],
            rules: [
              {
                required: true,
                whitespace: true,
                message: "Proszę podaj informacje o wakacie lub usuń tą pozycje"
              }
            ]
          })(
            <Input
              placeholder="Nazwa Stanowiska"
              style={{ width: "60%", marginRight: 8 }}
            />
          )}
          {keys.length > 1 ? (
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              disabled={keys.length === 1}
              onClick={() => this.remove(k)}
            />
          ) : null}
        </FormItem>
      );
    });

    return (
      <Layout>
        <Header style={{ background: "#fff", marginLeft: "10px" }}>
          <h1>Utwórz swój temat</h1>
        </Header>
        <Content style={{ marginTop: "20px" }}>
          <Form onSubmit={this.handleSubmit}>
            <FormItem {...formItemLayout} label="Temat Pracy" hasFeedback>
              {getFieldDecorator("select", {
                rules: [
                  { required: true, message: "Proszę podaj nazwę tematu" }
                ]
              })(
                <Input placeholder="Przetwarzanie Obrazu za pomocą biblioteki OpenCV" />
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="Opis Tematu" hasFeedback>
              {getFieldDecorator("select", {
                rules: [{ required: true, message: "Proszę dodaj krótki opis" }]
              })(
                <TextArea
                  placeholder="Temat polega na..."
                  autosize={{ minRows: 5, maxRows: 15 }}
                />
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="Zagadnienie/a">
              {getFieldDecorator("select-multiple", {
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
                  <Option value="red">Relacyjne Bazy Danych</Option>
                  <Option value="green">Sztuczna Inteligencja</Option>
                  <Option value="blue">Badania Operacyjne</Option>
                </Select>
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="Publiczny?"
              extra="Niektórzy nie chcą ujawniac tematów swoich prac publicznie. Aplikujący otrzyma pełne szczegóły dopiero po aplikacji"
            >
              {getFieldDecorator("switch", { valuePropName: "checked" })(
                <Switch />
              )}
            </FormItem>

            {formItems}

            <FormItem {...formItemLayoutWithOutLabel}>
              <Button type="dashed" onClick={this.add} style={{ width: "60%" }}>
                <Icon type="plus" /> Dodaj wakat
              </Button>
            </FormItem>

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
              <Button type="primary" htmlType="submit">
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
