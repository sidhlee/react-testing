import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, storeFactory } from "../test/testUtils";
import NewWordButton, {
  UnconnectedNewWordButton
} from "./NewWordButton";
import { getNewWord } from "./actions";
import moxios from "moxios";
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
      <UnconnectedNewWordButton getNewWord={getNewWordMock} success />
    );
    const newWordButton = findByTestAttr(wrapper, "new-word-button");
    newWordButton.simulate("click");
  });
  test("`getNewWord` action creator runs on NewWord button click", () => {
    const getNewWordCallCount = getNewWordMock.mock.calls.length;
    expect(getNewWordCallCount).toBe(1);
  });

  describe("`getNewWord` properly updates redux store", () => {
    let store;
    const oldSecretWord = "banff";
    const newSecretWord = "gaudy";
    const preloadedState = {
      success: true,
      guessedWords: [
        { guessedWord: "fetch", letterMatchCount: 3 },
        { guessedWord: "ditch", letterMatchCount: 3 },
        { guessedWord: "bed", letterMatchCount: 3 }
      ],
      secretWord: oldSecretWord
    };
    beforeEach(() => {
      // If the action creator that you're testing involves axios call
      // use moxios to intercept network request and respond with mock data
      moxios.install();
      store = storeFactory(preloadedState);
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: newSecretWord
        });
      });
    });
    afterEach(() => {
      moxios.uninstall();
    });
    test("clears guessed words list", () => {
      // When testing thunk with axios call
      // you MUST RETURN the store.dispatch(thunk) inside test callback
      // and put expect inside .then()
      return store.dispatch(getNewWord()).then(() => {
        const guessedWords = store.getState().guessedWords;
        expect(guessedWords.length).toBe(0);
      });
    });
    test("gets new secret word", () => {
      return store.dispatch(getNewWord()).then(() => {
        const secretWord = store.getState().secretWord;
        expect(secretWord.length).toBe(5);
        expect(secretWord).not.toBe("banff");
      });
    });
  });
});
