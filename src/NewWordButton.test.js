import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr, checkProps } from "../test/testUtils";
import NewWordButton from "./NewWordButton";

const defaultProps = { success: false, display: false };
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
  test("renders without error", () => {
    const wrapper = setup();
    const component = findByTestAttr(
      wrapper,
      "component-new-word-button"
    );
    expect(component.length).toBe(1);
  });
  test("renders no text when 'display' prop is false", () => {
    const wrapper = setup();
    const component = findByTestAttr(
      wrapper,
      "component-new-word-button"
    );
    expect(component.text()).toBe("");
  });
  test("renders non-empty text when 'display' prop is true", () => {
    const wrapper = setup({ display: true, resetAction: () => {} });
    const component = findByTestAttr(
      wrapper,
      "component-new-word-button"
    );
    expect(component.text().length).not.toBe(0);
  });
  test("does not throw warning with expected props", () => {
    const expectedProps = { display: false, resetAction: () => {} };
    checkProps(NewWordButton, expectedProps);
  });
  test("calls 'resetAction' prop upon button click", () => {
    // create spy function
    const resetActionMock = jest.fn();
    // send him in
    const wrapper = setup({
      display: true,
      resetAction: resetActionMock
    });
    const resetButton = findByTestAttr(
      wrapper,
      "component-new-word-button"
    );
    resetButton.simulate("click");
    expect(resetActionMock.mock.calls.length).toBe(1);
  });
});
