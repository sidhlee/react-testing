// test is done in integration.test.js
import { actionTypes } from "../actions";
/**
 * @function guessedWordsReducer
 * @param {array} state - Array of guessed words
 * @param {object} action - action to be reduced.
 * @returns {array} - New guessed words state.
 */
export default (state = [], action) => {
  switch (action.type) {
    case actionTypes.GUESS_WORD:
      return [...state, action.payload];
    case actionTypes.RESET_GAME:
      return [];
    default:
      return state;
  }
};
