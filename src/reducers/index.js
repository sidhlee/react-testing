import { combineReducers } from "redux";
import success from "./successReducer";
import guessedWords from "./guessedWordsReducer";
import secretWord from "./secretWordReducer";
import gaveUp from "./gaveUpReducer";
import userEnter from "./userEnterReducer";
import serverError from "./serverErrorReducer";

export default combineReducers({
  success,
  guessedWords,
  secretWord,
  gaveUp,
  userEnter,
  serverError
});
