import React from "react";
import { shallow } from "enzyme";

import { checkProps, findByTestAttr } from "../test/testUtils";
import EnterWordForm from "./EnterWordForm";

const defaultProps = { formAction: () => {} };

/**
 * Factory function to create a SHallowWrapper for the EnterWordForm component.
 * @function setup
 * @param {object} props - Component props specific to this setup.
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<EnterWordForm {...setupProps} />);
};

describe("render", () => {
  // the condition for this to render is within the App component
  // so we don't need to test conditional rendering here
  let wrapper;
  beforeEach(() => {
    wrapper = setup();
  });
  test("renders without error", () => {
    const component = findByTestAttr(
      wrapper,
      "component-enter-word-form"
    );
    expect(component.length).toBe(1);
  });
  test("renders instructions", () => {
    const instructions = findByTestAttr(
      wrapper,
      "enter-word-instructions"
    );
    expect(instructions.length).toBe(1);
  });
  test("renders submit button", () => {
    const submitButton = findByTestAttr(wrapper, "submit-button");
    expect(submitButton.length).toBe(1);
  });
  test("renders input control", () => {
    const inputControl = findByTestAttr(wrapper, "input-control");
    expect(inputControl.length).toBe(1);
  });
  test("does not throw warning with expected props", () => {
    const expectedProps = { formAction: () => {} };
    checkProps(EnterWordForm, expectedProps);
  });
});

// setUserSecretWord is a action creator passed from App
// as a prop named 'formAction'
describe("submit click action", () => {
  let setUserSecretWordMock, wrapper;
  const userSecretWord = "dodge";
  beforeEach(() => {
    setUserSecretWordMock = jest.fn();
    wrapper = setup({ formAction: setUserSecretWordMock });
    // EnterWordForm class component has instance property, 'inputControl'
    // which is a ref passed to the 'input-control' element.
    // React assigns 'current' props with the DOM element when
    // the component mounts, and assigns it back to 'null' when it un-mounts.
    // ref updates happen before didMount/didUpdate
    wrapper.instance().inputControl.current = {
      value: userSecretWord
    }; // set <input>'s value to "dodge"
    const form = findByTestAttr(wrapper, "component-enter-word-form");
    form.simulate("submit", { preventDefault: () => {} });
  });
  test("'setUserSecretWord' was called once", () => {
    expect(setUserSecretWordMock.mock.calls.length).toBe(1);
  });
  test("'setUserSecretWord' was called with input value as argument", () => {
    expect(setUserSecretWordMock.mock.calls[0][0]).toBe(
      userSecretWord
    );
  });
});
