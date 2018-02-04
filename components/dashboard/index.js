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
import ThesisApplicationsModal from "../../components/ThesisApplicationsModal";

const { Header, Content, Footer, Sider } = Layout;

class Dashboard extends React.Component {

  handleThesisDelete = record => {
    if (window.confirm("Czy na pewno chcesz usunąć ten temat?")) {
      axios.delete(`/api/thesis/${record.id}`).then(payload => {
        this.props.getTheses(
          JSON.parse(localStorage.getItem("user")).user.login
        );
      });
    }
  };

  handleApplicationWithdrawal = record => {
    if (window.confirm("Czy na pewno chcesz wycofać swoją aplikacje?")) {
      axios
        .delete(
          `/api/application/${record.Role.id}/${
            JSON.parse(localStorage.getItem("user")).user.login
          }/withdraw`
        )
        .then(payload => {
          this.props.getApplications(
            JSON.parse(localStorage.getItem("user")).user.login
          );
        });
    }
  };

  showThesisApplicationsModal = thesisId => {
    this.props.getThesisApplications(thesisId)
      .then(() => { this.setState({ thesisApplicationsModalVisible: true }); });
  };

  hideThesisApplicationsModal = () => {
    this.setState({ thesisApplicationsModalVisible: false });
    this.props.thesisApplications = null;
  };

  handleApplicationRejection = record => {
    //record przechowuje aktualną aplikacje
    //Należy zmienić jej status w bazie na odrzucona 
    //(co spowoduje wywalenie jej z modalu bo jest filter że pokazuje tylko aktywne)
    this.hideThesisApplicationsModal();
  };

  handleApplicationAcceptation = record => {
    //record przechowuje aktualną aplikacje
    //Należy zmienić jej status w bazie na zaapceptowaną oraz pozostałych aplikacji na daną rolę na odrzuconą
    // (co spowoduje wywalenie ich z modalu bo jest filter że pokazuje tylko aktywne
    this.hideThesisApplicationsModal();
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
            onClick={() => this.handleThesisDelete(record)}
          >
            Usuń
          </a>
          <a style={{ margin: "0 10px" }} href="#">
            Edytuj
          </a>
          <a 
            style={{ margin: "0 10px" }} 
            onClick={() => this.showThesisApplicationsModal(record.id)}
          >
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
          <a
            style={{ margin: "0 10px" }}
            onClick={() => this.handleApplicationWithdrawal(record)}
          >
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
          duration: 3.0,
          icon: <Icon type="smile-circle" style={{ color: "#108ee9" }} />
        });
      }, 100);
    } else if(this.props.url.query.success === "register") {
      setTimeout(() => {
        notification.open({
          message: "Sukces!",
          description: "Użytkownik pomyślnie zarejestrowany!",
          duration: 3.0,
          icon: <Icon type="smile-circle" style={{ color: "#108ee9" }} />
        });
      }, 100);
    }

    this.props.getTheses(JSON.parse(localStorage.getItem("user")).user.login);
    this.props.getApplications(JSON.parse(localStorage.getItem("user")).user.login);

    this.setState({ thesisApplicationsModalVisible: false });
  }

  render() {
    return (
      <Layout>
        <Header style={{ background: "#fff", padding: 0, paddingLeft: "20px" }}>
          <h1>Witaj!</h1>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          {this.props.isLoading || !this.props.theses || !this.props.applications ? (
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
        <ThesisApplicationsModal
          visible={this.state ? this.state.thesisApplicationsModalVisible : false}
          data={this.props.thesisApplications ? this.props.thesisApplications.data : []}
          hideModal={this.hideThesisApplicationsModal}
          rejection={this.handleApplicationRejection}
          acceptation={this.handleApplicationAcceptation}
          confirmLoading={this.props.isLoading}
          error={this.props.error}
        />
      </Layout>
    );
  }
}

export default Dashboard;
