import React from "react";
import renderer from "react-test-renderer";
import Head from "./Head";

describe("Head", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Head />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
