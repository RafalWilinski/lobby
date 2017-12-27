import React from "react";
import {
  Layout,
  Menu,
  Breadcrumb,
  Icon,
  Table,
  Row,
  Col,
  Spin,
  notification
} from "antd";

const { Header, Content, Footer, Sider } = Layout;

const topicColumns = [
  {
    title: "Nazwa",
    dataIndex: "name",
    key: "name",
    render: text => <a href="#">{text}</a>
  },
  {
    title: "Aplikanci",
    dataIndex: "applicants",
    key: "applicants"
  },
  {
    title: "Akcja",
    key: "action",
    render: (text, record) => (
      <span>
        <a style={{ margin: "0 10px" }} href="#">
          Usuń
        </a>
        <a style={{ margin: "0 10px" }} href="#">
          Edytuj
        </a>
        <a style={{ margin: "0 10px" }} href="#">
          Przeglądaj aplikacje
        </a>
      </span>
    )
  }
];

const applyColumns = [
  {
    title: "Nazwa tematu",
    dataIndex: "topicName",
    key: "topicName"
  },
  {
    title: "Nazwa Stanowiska",
    dataIndex: "positionName",
    key: "positionName"
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status"
  },
  {
    title: "Akcja",
    key: "action",
    render: (text, record) => (
      <span>
        <a style={{ margin: "0 10px" }} href="#">
          Wycofaj Aplikacje
        </a>
        <a style={{ margin: "0 10px" }} href="#">
          Edytuj
        </a>
      </span>
    )
  }
];

class Dashboard extends React.Component {
  componentDidMount() {
    if (this.props.url.query.success === "thesis") {
      setTimeout(() => {
        notification.open({
          message: "Sukces!",
          description: "Temat utworzony!",
          duration: 2.0,
          icon: <Icon type="smile-circle" style={{ color: "#108ee9" }} />
        });
      }, 100);
    }

    this.props.get(JSON.parse(localStorage.getItem("user")).user.login);
  }

  render() {
    return (
      <Layout>
        <Header style={{ background: "#fff", padding: 0, paddingLeft: "20px" }}>
          <h1>Witaj!</h1>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          {this.props.isLoading || !this.props.theses ? (
            <Spin />
          ) : (
            <Row gutter={16}>
              <Col className="gutter-row" span={12}>
                <h2 style={{ margin: "20px 0" }}>Twoje Tematy</h2>
                <Table
                  columns={topicColumns}
                  dataSource={this.props.theses.data
                    .filter(role => role.capitan)
                    .map(role => role.Thesis)}
                  pagination={false}
                  locale={{
                    emptyText: "Brak Tematów"
                  }}
                />
              </Col>
              <Col className="gutter-row" span={12}>
                <h2 style={{ margin: "20px 0" }}>Twoje Aplikacje</h2>
                <Table
                  columns={applyColumns}
                  dataSource={this.props.theses.data
                    .filter(role => !role.capitan)
                    .map(role => role.Thesis)}
                  pagination={false}
                  locale={{
                    emptyText: "Brak Aplikacji"
                  }}
                />
              </Col>
            </Row>
          )}
        </Content>
      </Layout>
    );
  }
}

export default Dashboard;
