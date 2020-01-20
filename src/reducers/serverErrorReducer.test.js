import { actionTypes } from "../actions/";
import serverErrorReducer from "./serverErrorReducer";

test("returns initial state of 'false' when no action is passed", () => {
  const newState = serverErrorReducer(undefined, {});
  expect(newState).toBe(false);
});
test("returns state of 'true' upon receiving ac action of type 'SERVER_ERROR'", () => {
  const action = { type: actionTypes.SERVER_ERROR };
  const newState = serverErrorReducer(false, action);
  expect(newState).toBe(true);
});
