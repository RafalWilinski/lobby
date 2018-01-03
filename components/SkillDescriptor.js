import React from "react";
import { Select, Form, Rate } from "antd";
import skills from "../consts/skills";

const FormItem = Form.Item;
const Option = Select.Option;

class SkillDescriptor extends React.Component {
  handleRateChange = value => {
    this.setState({ value });
  };

  render() {
    const { key, index } = this.props;
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
          {getFieldDecorator(`skill-name-${key}`, {
            validateTrigger: ["onChange", "onBlur"],
            rules: [
              {
                required: true,
                whitespace: true,
                message: "Proszę podaj umiejętnosc"
              }
            ]
          })(
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Wybierz umiejętnosc"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {skills.map(skill => (
                <Option key={skill} value={skill}>
                  {skill}
                </Option>
              ))}
            </Select>
          )}
        </FormItem>
        <FormItem
          required={true}
          {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
          label={index === 0 ? "Stopien Zaawansowania" : ""}
        >
          {getFieldDecorator(`skill-value-${key}`, {
            validateTrigger: ["onChange", "onBlur"],
            rules: [
              {
                required: true,
                whitespace: true,
                message: "Podaj stopień zaawansowania"
              }
            ]
          })(
            <span>
              <Rate />
            </span>
          )}
        </FormItem>
      </div>
    );
  }
}

export default SkillDescriptor;
