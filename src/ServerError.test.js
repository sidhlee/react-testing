import React from "react";
import { shallow } from "enzyme";

import ServerError from "./ServerError";
import { findByTestAttr } from "../test/testUtils";

describe("render", () => {
  let wrapper, component;

  beforeEach(() => {
    wrapper = shallow(<ServerError />);
    component = findByTestAttr(wrapper, "component-server-error");
  });
  test("renders without error", () => {
    expect(component.length).toBe(1);
  });
  test("renders non-empty-text", () => {
    expect(component.text().length).toBeGreaterThan(0);
  });
});
