import React from "react";
import { Layout } from "antd";

const { Header, Content } = Layout;


class Apply extends React.Component {
  render() {
    return (
      <Layout>
        <Header style={{ background: "#fff", padding: 0, paddingLeft: "20px" }}>
          <h1>Aplikuj</h1>
        </Header>
        <Content style={{ margin: "0 16px" }}>
        </Content>
      </Layout>
    );
  }
};

export default Apply;
