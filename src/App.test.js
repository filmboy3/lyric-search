import React from "react";
import { shallow } from "enzyme";
import App from "./App";

describe("App", () => {
  const app = shallow(<App />);

  it("renders correctly", () => {
    expect(app).toMatchSnapshot();
  });

  it("renders a h1 child element", () => {
    expect(app.find("h1").length).toEqual(1);
  });
});
