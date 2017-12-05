import React from "react";
import { Layout, Menu, Input, Icon, Form, Row, Col, Button } from "antd";
import Result from "./card";

const { Header, Content, Footer, Sider } = Layout;
const FormItem = Form.Item;

class SearchForm extends React.Component {
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
          <FormItem label={`Kategorie`}>
            {getFieldDecorator(`query`)(
              <Input placeholder="Przetwarzanie..." />
            )}
          </FormItem>
        </Col>
        <Col span={6} style={{ padding: "10px" }}>
          <FormItem label={`Wymagane umiejętnosci`}>
            {getFieldDecorator(`query`)(
              <Input placeholder="Przetwarzanie..." />
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
              Search
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
              Clear
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
