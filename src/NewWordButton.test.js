import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, storeFactory } from "../test/testUtils";
import NewWordButton, {
  UnconnectedNewWordButton
} from "./NewWordButton";
import App from "./App";
/**
 * Factory function to create ShallowWrapper for NewWordButton component.
 * @function setup
 * @param {object} initialState - Initial state for this setup
 * @return {ShallowWrapper}
 */
const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  return shallow(<NewWordButton store={store} />)
    .dive()
    .dive();
};

test("renders nothing if word is not guessed", () => {
  const wrapper = setup({ success: false });
  const newWordButton = findByTestAttr(wrapper, "new-word-button");
  expect(newWordButton.length).toBe(0);
});

describe("word has been successfully guessed", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({ success: true });
  });
  test("renders new word button", () => {
    const newWordButton = findByTestAttr(wrapper, "new-word-button");
    expect(newWordButton.length).toBe(1);
  });
  describe("redux props", () => {
    test("has a success piece of state as prop", () => {
      const successProp = wrapper.instance().props.success;
      expect(successProp).toBe(true);
    });
    test("`getNewWord` action creator is a function prop", () => {
      const getNewWordProp = wrapper.instance().props.getNewWord;
      expect(getNewWordProp).toBeInstanceOf(Function);
    });
  });
});

describe("`getNewWord` action creator call", () => {
  let getNewWordMock, wrapper;
  beforeEach(() => {
    getNewWordMock = jest.fn();
    wrapper = shallow(
      <UnconnectedNewWordButton getNewWord={getNewWordMock} />
    );
    const newWordButton = findByTestAttr(wrapper, "new-word-button");
    newWordButton.simulate("click");
  });
  test("`getNewWord` action creator runs on NewWord button click", () => {
    const getNewWordCallCount = getNewWordMock.mock.calls.length;
    expect(getNewWordCallCount).toBe(1);
  });
  describe("redux store", () => {
    let wrapper;
    test("clears guessed words list", () => {
      const wrapper = setup();
      const guessedWords = wrapper.instance().props.guessedWords;
      expect(guessedWords.length).toBe(0);
    });
    test("gets new secret word", () => {
      const wrapper = setup();
      const secretWord = wrapper.instance().props.secretWord;
      expect(secretWord);
    });
  });
});
