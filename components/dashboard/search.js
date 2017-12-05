import React from "react";
import { Layout, Menu, Breadcrumb, Icon } from "antd";

const { Header, Content, Footer, Sider } = Layout;

class Dashboard extends React.Component {
  render() {
    return (
      <Layout>
        <Header
          style={{ background: "#fff", padding: 0, paddingLeft: "20px" }}
        />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
            Index
          </div>
        </Content>
      </Layout>
    );
  }
}

export default Dashboard;
