import { storeFactory } from "../test/testUtils";
import { guessWord, setUserSecretWord } from "../src/actions";
import { getLetterMatchCount } from "./helpers/index";

/* 
Integration test creates a new redux store instance with optional preloaded state.
Then in each test, it dispatches an action creator and gets new state from the store.
If the new state updated by the reducer matches expected state, the test passes.
*/
describe("guessWord action dispatcher", () => {
  const secretWord = "party";
  const unsuccessfulGuessedWord = "train";
  const moreState = {
    gaveUp: false,
    userEnter: null,
    serverError: false
  };
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

describe("setUserSecretWord action dispatcher", () => {
  // this is in the integration test because it involves
  // the setUserSecretWord action creator and two reducers:
  // (userEnterReducer and secretWordReducer)
  let store, newState;
  const preloadedState = {
    secretWord: "party"
  };
  const userSecretWord = "dodge";
  beforeEach(() => {
    store = storeFactory(preloadedState);
    store.dispatch(setUserSecretWord(userSecretWord));
    newState = store.getState();
  });
  test("updates 'secretWord' state correctly after user secret word entered", () => {
    // only testing one piece of state
    expect(newState.secretWord).toBe(userSecretWord);
  });
  test("updates 'userEnter' state correctly after user secret word is submitted", () => {
    expect(newState.userEnter).toBe("done");
  });
});
