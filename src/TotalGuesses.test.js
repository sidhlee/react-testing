import React from "react";
import { findByTestAttr, checkProps } from "../test/testUtils";
import { shallow } from "enzyme";
import TotalGuesses from "./TotalGuesses";

const defaultProps = {
  totalGuesses: 3
};

/**
 * Factory function to create a ShallowWrapper for TotalGuesses component.
 * @function setup
 * @param {object} props - Component props specific to this setup.
 * @return {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = {
    ...defaultProps,
    ...props
  };
  return shallow(<TotalGuesses {...setupProps} />);
};
describe("TotalGuess", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup();
  });
  test("does not throw error with expected prop type", () => {
    checkProps(TotalGuesses, defaultProps); // how do you test passed props from parent component?
  });
  test("renders without error", () => {
    const components = findByTestAttr(wrapper, "total-guesses");
    expect(components.length).toBe(1);
  });
  test("show correct number of guesses", () => {
    const component = findByTestAttr(wrapper, "total-guesses");
    expect(component.text()).toMatch(/3/);
  });
});
