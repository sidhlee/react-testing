/* 
NOTE: This is not the optimal way to track whether or not the user has given up.
With two boolean pieces of state (success, gaveUp), we have four possibilities:

success: false, gaveUp: false // user is playing the game
success: true, gaveUp: false // user guessed correctly
success: false, gaveUp: true // user gave up
success: true, gaveUp: true // impossible case 

To improve, you can have one piece of state 'status'
with three possibilities: inProgress, victory, gaveUp
It will be much easier for debugging later.
*/

import { actionTypes } from "../actions";

/**
 * @function gaveUp
 * @param {boolean} state - Whether the user has given up.
 * @param {object} action - Action to be reduced.
 * @returns {boolean} - gaveUp state.
 */
export default (state = false, action) => {
  switch (action.type) {
    case actionTypes.GIVE_UP:
      return true;
    case actionTypes.RESET_GAME:
      return false;
    default:
      return state;
  }
};
