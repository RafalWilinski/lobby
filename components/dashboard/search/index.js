import React from "react";
import { Layout, Menu, Input, Icon, Form, Row, Col, Button, Select, Checkbox } from "antd";
import axios from "axios";

import Result from "./card";

const { Header, Content, Footer, Sider } = Layout;
const FormItem = Form.Item;

class SearchForm extends React.Component {
  state = {
    branches: [],
    skills: []
  }

  componentDidMount() {
    axios.get("/api/branches").then(payload => {
      this.setState({
        branches: payload.data.branches
      });
    });

    axios.get("/api/skills").then(payload => {
      this.setState({
        skills: payload.data.skills
      });
    });
  }

  handleSearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log("Received values of form: ", values);
    });
  };

  handleReset = () => {
    this.props.form.resetFields();
  };

  getFields() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Col span={6} style={{ padding: "10px" }}>
          <FormItem label={`Nazwa / Opis`}>
            {getFieldDecorator(`query`)(
              <Input placeholder="Przetwarzanie..." />
            )}
          </FormItem>
        </Col>
        <Col span={6} style={{ padding: "10px" }}>
          <FormItem
            label="Zainteresowania"
          >
            {getFieldDecorator("interests", {
              rules: [
                {
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
        </Col>
        <Col span={6} style={{ padding: "10px" }}>
          <FormItem
            label="Umiejętności"
          >
            {getFieldDecorator("skills", {
              rules: [
                {
                  message: "Wybierz swoje umiejętności",
                  type: "array"
                }
              ]
            })(
              <Select mode="multiple"  placeholder="C++" notFoundContent="Brak wyników" 
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
              }>
                {this.state.skills.map(branch => (
                  <Select.Option value={branch.name} key={branch.name}>
                    {branch.name}
                  </Select.Option>
                ))}
              </Select>
            )}
          </FormItem>
        </Col>
        <Col span={6} style={{ padding: "10px", paddingTop: '40px' }}>
          <FormItem
            style={{ marginBottom: 8 }}
          >
            {getFieldDecorator("available", {
              valuePropName: "checked",
            })(
              <Checkbox>
                Ma wolne miejsca?
              </Checkbox>
            )}
          </FormItem>
        </Col>
      </div>
    );
  }

  render() {
    return (
      <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
        <Row gutter={24}>{this.getFields()}</Row>
        <Row>
          <Col span={24} style={{ textAlign: "right" }}>
            <Button type="primary" htmlType="submit">
              Szukaj
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
              Wyczyść
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

const WrappedAdvancedSearchForm = Form.create()(SearchForm);

export default () => (
  <Layout>
    <Header style={{ background: "#fff", padding: 0, paddingLeft: "20px" }}>
      <h1>Wyszukaj tematy</h1>
    </Header>
    <Content style={{ margin: "0 16px" }}>
      <WrappedAdvancedSearchForm />
      <div style={{ marginTop: "20px" }}>
        <Result title={"Przetwarzanie obrazów za pomocą biblioteki open CV"} />
      </div>
    </Content>
  </Layout>
);
