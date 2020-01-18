import { storeFactory } from "../test/testUtils";
import { guessWord } from "../src/actions";
import { getLetterMatchCount } from "./helpers/index";

describe("guessWord action dispatcher", () => {
  const secretWord = "party";
  const unsuccessfulGuessedWord = "train";
  const moreState = { gaveUp: false };
  describe("no guessed words", () => {
    let store;
    const initialState = { secretWord };
    beforeEach(() => {
      store = storeFactory(initialState); // create store with middleware and preloaded state
    });
    test("updates state correctly for unsuccessful guess", () => {
      store.dispatch(guessWord(unsuccessfulGuessedWord));
      const newState = store.getState();
      const expectedState = {
        ...initialState,
        ...moreState,
        success: false,
        guessedWords: [
          {
            guessedWord: unsuccessfulGuessedWord,
            letterMatchCount: getLetterMatchCount(
              unsuccessfulGuessedWord,
              secretWord
            )
          }
        ]
      };
      expect(newState).toEqual(expectedState);
    });
    test("updates state correctly for successful guess", () => {
      store.dispatch(guessWord(secretWord));
      const newState = store.getState();
      const expectedState = {
        ...initialState,
        ...moreState,
        success: true,
        guessedWords: [
          {
            guessedWord: secretWord,
            letterMatchCount: 5
          }
        ]
      };
      expect(newState).toEqual(expectedState);
    });
  });
  describe("some guessed words", () => {
    const guessedWords = [
      { guessedWord: "agile", letterMatchCount: 1 }
    ];
    const initialState = {
      guessedWords,
      secretWord
    };
    let store;
    beforeEach(() => {
      store = storeFactory(initialState);
    });
    test("updates state correctly for unsuccessful guess", () => {
      store.dispatch(guessWord(unsuccessfulGuessedWord));
      const newState = store.getState();
      const expectedState = {
        ...initialState,
        ...moreState,
        success: false,
        guessedWords: [
          ...guessedWords,
          {
            guessedWord: unsuccessfulGuessedWord,
            letterMatchCount: getLetterMatchCount(
              unsuccessfulGuessedWord,
              secretWord
            )
          }
        ]
      };
      expect(newState).toEqual(expectedState);
    });
    test("updates state correctly for successful guess", () => {
      store.dispatch(guessWord(secretWord));
      const newState = store.getState();
      const expectedState = {
        ...initialState,
        ...moreState,
        success: true,
        guessedWords: [
          ...guessedWords,
          {
            guessedWord: secretWord,
            letterMatchCount: 5
          }
        ]
      };
      expect(newState).toEqual(expectedState);
    });
  });
});
