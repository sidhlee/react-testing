import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, storeFactory } from "../test/testUtils";
import NewWordButton from "./NewWordButton";
import { getNewWord } from "./actions";
import moxios from "moxios";

const defaultProps = { success: false };
/**
 * Factory function to create ShallowWrapper for NewWordButton component.
 * @function setup
 * @param {object} initialState - Initial state for this setup
 * @return {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = {
    ...defaultProps,
    ...props
  };
  return shallow(<NewWordButton {...setupProps} />);
};

describe("render", () => {
  test("renders without error", () => {});
  test("renders no text when 'display' prop is false", () => {});
  test("renders non-empty text when 'display' prop is true", () => {});
  test("does not throw warning with expected props", () => {});
  test("calls 'resetAction' prop upon button click", () => {});
});
