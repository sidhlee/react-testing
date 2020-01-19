import React from "react";
import { shallow } from "enzyme";
import { storeFactory, findByTestAttr } from "../test/testUtils";
import App, { UnconnectedApp } from "./App";

const setup = (preloadedState = {}) => {
  const store = storeFactory(preloadedState);
  const wrapper = shallow(<App store={store} />)
    .dive()
    .dive();
  return wrapper;
};

describe("Redux props", () => {
  let wrapper;
  const success = true;
  const secretWord = "party";
  const guessedWords = [
    { guessedWord: "train", letterMatchCount: 3 }
  ];
  const gaveUp = true;
  const userEnter = null;

  beforeEach(() => {
    // hydrates default pieces of state
    wrapper = setup({
      success,
      secretWord,
      guessedWords,
      gaveUp,
      userEnter
    });
  });
  /* 
  NOTE: About UnconnectedApp.props
  - props are passed with mapState. If a prop is not included in mapState,
  that prop will not be included in UnconnectedApp.props
  - preloadedState passed to createStore is send to reducers 
  to replace default state.
  */

  test("has access to `success` state", () => {
    // wrapper.instance() returns the node's underlying class instance.
    // i.e. it returns UnconnectedApp
    const successProp = wrapper.instance().props.success;
    // expects UnconnectedApp to receive success piece of state as prop
    // which has the value preloaded via 2nd argument to createStore()
    expect(successProp).toBe(success);
  });
  test("has access to 'gaveUp' state", () => {
    const gaveUpProp = wrapper.instance().props.gaveUp;
    // we can also check that the component receives
    // expected piece of state as prop regardless of its value.
    expect(gaveUpProp).not.toBe(undefined);
  });
  test("has access to `secretWord` state", () => {
    const secretWordProp = wrapper.instance().props.secretWord;
    expect(secretWordProp).toBe(secretWord);
  });
  test("has access to `guessedWords` state", () => {
    const guessedWordsProp = wrapper.instance().props.guessedWords;
    expect(guessedWordsProp).toEqual(guessedWords);
  });
  test("`getSecretWord` action creator is a function on the props", () => {
    const getSecretWordProp = wrapper.instance().props.getSecretWord;
    expect(getSecretWordProp).toBeInstanceOf(Function);
  });
  test("'resetGame' action creator is a function on the props", () => {
    const resetGameProp = wrapper.instance().props.resetGame;
    expect(resetGameProp).toBeInstanceOf(Function);
  });
  test("has access to 'userEnter' state", () => {
    const userEnterProp = wrapper.instance().props.userEnter;
    expect(userEnterProp).toEqual(userEnter);
  });
  test("'setUserEntering' action creator is a function on the props", () => {
    const setUserEnteringProp = wrapper.instance().props
      .setUserEntering;
    expect(setUserEnteringProp).toBeInstanceOf(Function);
  });
  test("'setUserSecretWord' action creator is a function on the props", () => {
    const setUserSecretWordProp = wrapper.instance().props
      .setUserSecretWord;
    expect(setUserSecretWordProp).toBeInstanceOf(Function);
  });
});

test("`getSecretWord` runs on App mount", () => {
  const getSecretWordMock = jest.fn();

  const props = {
    getSecretWord: getSecretWordMock,
    success: false, // required by prop-type
    guessedWords: [], // required by prop-type,
    gaveUp: false // required by prop-type
  };

  // set up app component with getSecretWordMock as the get SecretWord prop
  const wrapper = shallow(<UnconnectedApp {...props} />);

  // run lifecycle method
  wrapper.instance().componentDidMount();

  // check to see if the mock ran
  const getSecretWordCallCount = getSecretWordMock.mock.calls.length;
  expect(getSecretWordCallCount).toBe(1);
});

describe("render", () => {
  test("renders EnterWordForm when userEnter state is 'inProgress'", () => {
    const wrapper = setup({ userEnter: "inProgress" });
    const form = findByTestAttr(wrapper, "component-enter-word-form");
    expect(form.length).toBe(1);
  });
  test("does not render EnterWordForm when userEnter state is 'null'", () => {
    const wrapper = setup({ userEnter: null });
    const form = findByTestAttr(wrapper, "component-enter-word-form");
    expect(form.length).toBe(0);
  });
  test("does not render EnterWordForm when userEnter state is 'done'", () => {
    const wrapper = setup({ userEnter: "done" });
    const form = findByTestAttr(wrapper, "component-enter-word-form");
    expect(form.length).toBe(0);
  });
});
