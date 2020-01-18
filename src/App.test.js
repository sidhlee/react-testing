import React from "react";
import { shallow } from "enzyme";
import { storeFactory } from "../test/testUtils";
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
  const gaveUp = false;

  beforeEach(() => {
    wrapper = setup({
      success,
      secretWord,
      guessedWords,
      gaveUp
    });
  });

  test("has access to `success` state", () => {
    const successProp = wrapper.instance().props.success;
    expect(successProp).toBe(success);
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
