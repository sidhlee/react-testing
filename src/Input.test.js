import React from "react";
import { shallow } from "enzyme";

// we don't need checkProp util function here because Input gets all its props from redux store
import { findByTestAttr, storeFactory } from "../test/testUtils";
import Input, { UnconnectedInput } from "./Input";

/* 
We are testing Input which is wrapped in redux's connect() and exported.
In our actual app, <Input /> will be within <App /> which is wrapped in <Provider />

For our tests, we need to create a fresh store that matches configuration for the actual store and pass it as props for each test. Otherwise, you'll get this error in the console:

Invariant Violation: Could not find "store" in the context of "Connect(Input)". Either wrap the root component in a <Provider>, or pass a custom React context provider to <Provider> and the corresponding React context consumer to Connect(Input) in connect options.
*/

/**
 * Factory function to create a ShallowWrapper for the Input component.
 * @function setup
 * @param {object} initialState - Initial state for this setup.
 * @returns {ShallowWrapper}
 */
const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(<Input store={store} />)
    .dive() // get past HOC <ContextProvider />
    .dive(); // get past <Input> to the returned JSX element
  return wrapper;
};

// we have two contexts
describe("render", () => {
  describe("word has not been guessed", () => {
    let wrapper; // scope the wrapper to the describe
    beforeEach(() => {
      const initialState = {
        success: false
      };
      wrapper = setup(initialState);
    });

    test("renders component without error", () => {
      const components = findByTestAttr(wrapper, "component-input");
      expect(components.length).toBe(1);
    });
    test("renders the input control", () => {
      const controls = findByTestAttr(wrapper, "input-control");
      expect(controls.length).toBe(1);
    });
    test("renders a submit button", () => {
      const submitButtons = findByTestAttr(wrapper, "submit-button");
      expect(submitButtons.length).toBe(1);
    });
  });

  describe("word has been guessed", () => {
    // expect to see nothing in this case
    let wrapper;
    beforeEach(() => {
      const initialState = {
        success: true
      };
      wrapper = setup(initialState);
    });
    test("renders component without error", () => {
      const components = findByTestAttr(wrapper, "component-input");
      expect(components.length).toBe(1);
    });
    test("does not render the input control", () => {
      const inputControls = findByTestAttr(wrapper, "input-control");
      expect(inputControls.length).toBe(0);
    });
    test("does not render a submit button", () => {
      const submitButtons = findByTestAttr(wrapper, "submit-button");
      expect(submitButtons.length).toBe(0);
    });
  });
});

describe("redux props", () => {
  test("has success piece of state as prop", () => {
    const success = true; // arbitrary value. could also be false
    const wrapper = setup({ success });
    const successProp = wrapper.instance().props.success;
    expect(successProp).toBe(success);
  });
  test("`guessWord` action creator is a function prop", () => {
    const wrapper = setup();
    const guessWordProp = wrapper.instance().props.guessWord;
    expect(guessWordProp).toBeInstanceOf(Function);
  });
});

describe("`guessWord` action creator call", () => {
  let wrapper, guessWordMock;
  const guessedWord = "train";
  beforeEach(() => {
    guessWordMock = jest.fn();
    // shallow-wrap UnconnectedInput injecting mock action creator
    wrapper = shallow(<UnconnectedInput guessWord={guessWordMock} />);

    // const inputControl = findByTestAttr(wrapper, "input-control");
    // inputControl.simulate("change", {
    //   target: { name: "value", value: "train" }
    // });
    wrapper.setState({ value: guessedWord }); // maybe better way because we can care less about the implementation
    const submitButton = findByTestAttr(wrapper, "input-form");
    // ShallowWrapper.simulate() takes mock event object as 2nd argument
    submitButton.simulate("submit", { preventDefault: () => {} });
  });
  test("`guessWord` action creator runs on form submit", () => {
    const guessWordCallCount = guessWordMock.mock.calls.length;
    expect(guessWordCallCount).toBe(1);
  });
  test("calls `guessWord` with input value as argument", () => {
    const guessWordArg = guessWordMock.mock.calls[0][0];
    expect(guessWordArg).toBe(guessedWord);
  });
  test("clears input control value upon submit", () => {
    const value = wrapper.state("value");
    expect(value).toBe("");
  });
});
