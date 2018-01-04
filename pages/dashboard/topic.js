import React from "react";
import { Layout, Spin } from "antd";
import axios from "axios";

import DashboardWrapper from "../../components/DashboardWrapper";
import Head from "../../components/Head.js";
import HWCenterWrapper from "../../components/HVCenterWrapper";

const { Header, Content } = Layout;

export default class extends React.Component {
  static async getInitialProps({ req, pathname }) {
    const id = req.url.split(pathname)[1].substring(1);
    const { data } = await axios.get(`http://localhost:3000/api/thesis/${id}`);

    return data;
  }

  renderData() {
    return (
      <Layout>
        <Header style={{ background: "#fff", paddingLeft: "20px" }}>
          <h1>{this.props.data.name}</h1>
        </Header>
        <Content style={{ marginTop: "20px" }} />
      </Layout>
    );
  }

  render() {
    console.log(this.props.data);

    return (
      <Head>
        <HWCenterWrapper>
          <DashboardWrapper {...this.props}>
            {this.props.data ? this.renderData() : <Spin />}
          </DashboardWrapper>
        </HWCenterWrapper>
      </Head>
    );
  }
}
