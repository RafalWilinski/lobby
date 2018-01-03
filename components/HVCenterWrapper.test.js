import React from "react";
import renderer from "react-test-renderer";
import HVCenterWrapper from "./HVCenterWrapper";

describe("HVCenterWrapper", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<HVCenterWrapper />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
