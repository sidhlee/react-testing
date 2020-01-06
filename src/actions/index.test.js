import { correctGuess, actionTypes } from "./";

describe("correctGuess", () => {
  test("returns an action with type 'CORRECT_GUESS", () => {
    const action = correctGuess();
    // toEqual() compares deep equality (recursively)
    expect(action).toEqual({ type: actionTypes.CORRECT_GUESS });
  });
});
