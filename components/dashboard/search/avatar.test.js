import React from "react";
import renderer from "react-test-renderer";
import Avatar from "./avatar";

describe("Avatar", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<Avatar name="name" position="pos" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
