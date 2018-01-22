import React from "react";
import renderer from "react-test-renderer";
import ApplyModal from "./ApplyModal";

describe("ApplyModal", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<ApplyModal />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
