import React from "react";
import { Modal, Button, Input, Alert, Table } from "antd";

const { TextArea } = Input;

class ThesisApplicationsModal extends React.Component {
  state = {
    desc: ""
  };

  applicationColumns = [
    {
      title: "Nazwa Stanowiska",
      dataIndex: "positionName",
      key: "positionName",
      render: (text, record) => <a href={`#`}>{record.Role.name}</a>
    },
    {
      title: "Aplikujący",
      dataIndex: "person",
      key: "person",
      render: (text, record) => <a href={`#`}>{`${record.User.firstName} ${record.User.lastName}`}</a>
    },
    {
      title: "Opis aplikacji",
      dataIndex: "description",
      key: "description"
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
            onClick={() => this.handleAcceptation(record)}
          >
            Zaakceptuj
          </a>
          <a 
            style={{ margin: "0 10px" }}
            onClick={() => this.handleRejection(record)}
          >
            Odrzuć
          </a>
        </span>
      )
    }
  ];

  handleAcceptation = record => {
    this.props.acceptation(record);
  };

  handleRejection = record => {
    this.props.rejection(record);
  };

  handleCancel = () => {
    this.props.hideModal();
  };

  render() {
    return (
      <div>
        <Modal
          title={`Aplikacja do tematu`}// ${this.props.thesis.name}`}
          visible={this.props.visible}
          confirmLoading={this.props.isLoading}
          onCancel={this.handleCancel}
          footer={false}
          width={'75%'}
        >
          <Table
            columns={this.applicationColumns}
            dataSource={this.props.data}
            pagination={false}
            locale={{
              emptyText: "Brak Aplikacji"
            }}
          />
          {this.props.error && (
            <Alert message={this.props.error.message} type="error" />
          )}
        </Modal>
      </div>
    );
  }
}

export default ThesisApplicationsModal;
