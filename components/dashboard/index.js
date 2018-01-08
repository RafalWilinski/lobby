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
import axios from "axios";

const { Header, Content, Footer, Sider } = Layout;

class Dashboard extends React.Component {
  handleApplicationDelete = record => {
    if (window.confirm("Czy na pewno chcesz usunąć ten temat?")) {
      axios.delete(`/api/thesis/${record.id}`).then(payload => {
        this.props.get(JSON.parse(localStorage.getItem("user")).user.login);
      });
    }
  };

  topicColumns = [
    {
      title: "Nazwa",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <a href={`/dashboard/topic/${record.id}`}>{text}</a>
      )
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
        <span key={text}>
          <a
            style={{ margin: "0 10px" }}
            onClick={() => this.handleApplicationDelete(record)}
          >
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

  applyColumns = [
    {
      title: "Nazwa tematu",
      dataIndex: "topicName",
      key: "topicName",
      render: (text, record) => (
        <a href={`/dashboard/topic/${record.Role.Thesis.id}`}>
          {record.Role.Thesis.name}
        </a>
      )
    },
    {
      title: "Nazwa Stanowiska",
      dataIndex: "positionName",
      key: "positionName",
      render: (text, record) => <a href={`#`}>{record.Role.name}</a>
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
        <span key={text}>
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

    this.props.getTheses(JSON.parse(localStorage.getItem("user")).user.login);
    this.props.getApplications(
      JSON.parse(localStorage.getItem("user")).user.login
    );
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
                  columns={this.topicColumns}
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
                  columns={this.applyColumns}
                  dataSource={this.props.applications.data.filter(
                    application => !application.Role.capitan
                  )}
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
