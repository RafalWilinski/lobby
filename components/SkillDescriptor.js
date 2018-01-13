import React from "react";
import { Select, Form, Rate, Icon } from "antd";
import axios from "axios";

const FormItem = Form.Item;
const Option = Select.Option;

class SkillDescriptor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skills: [],
      priority: this.props.priority,
      skillName: this.props.skillName
    };
  }

  componentDidMount() {
    axios.get("/api/skills").then(payload => {
      this.setState({
        skills: payload.data.skills
      });
    });
  }

  handleRateChange = priority => {
    this.setState({ priority });
  };

  handleSkillNameChange = skillName => {
    this.setState({ skillName });
  };

  render() {
    const { skillName, priority, index } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 }
      }
    };

    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 14, offset: 4 }
      }
    };

    return (
      <div>
        <FormItem
          required={true}
          {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
          label={index === 0 ? "Umiejętnosc" : ""}
          style={{ marginBottom: "10px" }}
        >
          {getFieldDecorator(`skill-name-${index}`, {
            validateTrigger: ["onChange", "onBlur"],
            rules: [
              {
                required: true,
                whitespace: true,
                message: "Proszę podaj umiejętność"
              }
            ], initialValue: skillName
          })(
            <Select onChange={this.handleSkillNameChange}
              showSearch
              style={{ width: 200 }}
              placeholder="Wybierz umiejętność"
              notFoundContent="Brak wyników" 
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {this.state.skills.map(skills => ( <Option value={skills.name} key={skills.name}>{skills.name}</Option>))}
            </Select>
          )}
          {index !== 0 ? (
              <Icon
                className="dynamic-delete-button"
                type="minus-circle-o"
                onClick={this.props.onRemove}
              />
            ) : null}
        </FormItem>
        <FormItem
          required={true}
          {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
          label={index === 0 ? "Stopien Zaawansowania" : ""}
        >
          {getFieldDecorator(`skill-value-${index}`, {
            validateTrigger: ["onChange", "onBlur"],
            rules: [
              {
                //required: true,
                whitespace: true,
                message: "Podaj stopień zaawansowania"
              }
            ]
          })(<span>
            <Rate allowClear={false} defaultValue={priority} onChange={this.handleRateChange}/>
          </span>)}
        </FormItem>
      </div>
    );
  }
}

export default SkillDescriptor;
