import React from "react";
import { Layout, Spin, Button, Tag, Card } from "antd";
import axios from "axios";

import Avatar from "../../components/dashboard/search/avatar";
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

  renderMate(role) {
    return (
      <Avatar
        key={role.id}
        position={role.name}
        name={`${role.User.firstName} ${role.User.lastName}`}
        avatar="http://www.downesvets.co.uk/wp-content/uploads/2015/07/kitten-package1.png"
      />
    );
  }

  renderRole(role) {
    return (
      <Card key={role.id} title={role.name} style={{ width: 300 }}>
        <p style={{ marginBottom: "10px 0" }}>{role.description}</p>
        <h3 style={{ margin: "10px 0" }}>Wymagane Umiejętności:</h3>
        {role.RoleSkills.map(skill => (
          <Tag key={`${role.id}-${skill.id}`}>{skill.skillName}</Tag>
        ))}

        <Button
          type="primary"
          icon="download"
          size={"large"}
          style={{ margin: "10px 0" }}
        >
          Aplikuj
        </Button>
      </Card>
    );
  }

  renderData() {
    return (
      <Layout>
        <Header style={{ background: "#fff", paddingLeft: "20px" }}>
          <h1>{this.props.data.name}</h1>
        </Header>
        <Content style={{ margin: "20px" }}>
          <img src="" />
          <div style={{ fontSize: "1.4em" }}>{this.props.data.description}</div>
          <h2 style={{ margin: "10px 0" }}>Członkowie zespołu:</h2>
          {this.props.data.Roles.filter(x => x.User).map(this.renderMate)}
          <h2 style={{ margin: "10px 0" }}>Dostępne pozycje:</h2>
          {this.props.data.Roles.filter(x => !x.User).map(this.renderRole)}
        </Content>
      </Layout>
    );
  }

  render() {
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
