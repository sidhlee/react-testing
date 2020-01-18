import userEnterReducer from "./userEnterReducer";

test("returns default initial state of 'null' when no action is passed", () => {
  const newState = userEnterReducer(undefined, {});
  expect(newState).toBeNull();
});
test("returns state of 'inProgress' upon receiving an action of type 'USER_ENTERING'", () => {});
test("returns state of 'done' upon receiving an action of type 'USER_ENTERED'", () => {});
test("returns state of 'null' upon receiving an action of type 'RESET_GAME'", () => {});
