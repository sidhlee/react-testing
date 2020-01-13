import React from "react";
import { findByTestAttr, checkProps } from "../test/testUtils";
import { shallow } from "enzyme";
import TotalGuess from "./TotalGuesses";

const defaultProps = {};

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
  return shallow(<TotalGuess {...setupProps} />);
};
describe("TotalGuess", () => {
  test("renders without error", () => {});
  test("show correct number of guesses", () => {});
});
