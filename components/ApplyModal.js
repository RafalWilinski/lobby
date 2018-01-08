import React from "react";
import { Modal, Button, Input, Alert } from "antd";

const { TextArea } = Input;

class ApplyModal extends React.Component {
  state = {
    desc: ""
  };

  handleOk = () => {
    this.props.apply(this.props.role.id, this.state.desc);
  };

  handleCancel = () => {
    this.props.hideModal();
  };

  render() {
    return (
      <div>
        <Modal
          title={`Aplikacja na stanowisko ${this.props.role &&
            this.props.role.name}`}
          visible={this.props.visible}
          onOk={this.handleOk}
          confirmLoading={this.props.isLoading}
          onCancel={this.handleCancel}
          okText="Aplikuj!"
          cancelText="Anuluj"
        >
          <TextArea
            onChange={e => this.setState({ desc: e.target.value })}
            rows={4}
            ref={r => (this.desc = r)}
            placeholder="Powiedz dlaczego nadajesz się na to stanowisko i dlaczego interesuje Cię ten temat"
          />
          {this.props.error && (
            <Alert message={this.props.error.message} type="error" />
          )}
        </Modal>
      </div>
    );
  }
}

export default ApplyModal;
