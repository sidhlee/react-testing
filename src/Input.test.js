import React from "react";
import { shallow } from "enzyme";

// we don't need checkProp util function here because Input gets all its props from redux store
import { findByTestAttr } from "../test/testUtils";
import Input from "./Input";

/**
 * Factory function to create a ShallowWrapper for the Input component.
 * @function setup
 * @param {object} initialState - Initial state for this setup.
 * @returns {ShallowWrapper}
 */
const setup = (initialState = {}) => {
  const wrapper = shallow(<Input />);
  // check what this connected component looks like
  console.log(wrapper.debug()); // stringify what it's rendering
};

/* 
We are testing Input which is wrapped in redux's connect() and exported.
In our actual app, <Input /> will be within <App /> which is wrapped in <Provider />

For our tests, we need to create a fresh store that matches configuration for the actual store and pass it as props for each test. Otherwise, you'll get this error in the console:

Invariant Violation: Could not find "store" in the context of "Connect(Input)". Either wrap the root component in a <Provider>, or pass a custom React context provider to <Provider> and the corresponding React context consumer to Connect(Input) in connect options.
*/

setup();

// we have two contexts
describe("render", () => {
  describe("word has not been guessed", () => {
    test("renders component without error", () => {});
    test("renders the input control", () => {});
    test("renders a submit button", () => {});
  });

  describe("word has been guessed", () => {
    // expect to see nothing in this case
    test("renders component without error", () => {});
    test("does not render the input control", () => {});
    test("does not render a submit button", () => {});
  });
});
// using describe for test organization, not for context
describe("update state", () => {});
