import React from "react";
import renderer from "react-test-renderer";
import SkillDescriptor from "./SkillDescriptor";

describe("SkillDescriptor", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<SkillDescriptor form={{ getFieldDecorator: () => () => {} }} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
