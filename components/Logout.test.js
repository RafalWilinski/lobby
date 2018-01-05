import React from "react";
import renderer from "react-test-renderer";
import Logout from "./Logout";

describe("Logout", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Logout />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
