import React from "react";
import { shallow } from "enzyme";
import {
  findByTestAttr,
  checkProps,
  storeFactory
} from "../test/testUtils";
import NewWordButton, {
  UnconnectedNewWordButton
} from "./NewWordButton";

const defaultProps = {};
/**
 * Factory function to create SHallowWrapper for NewWordButton component.
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

describe("render", () => {
  test("renders component without error", () => {});
  test("renders nothing if word is not guessed", () => {});
  test("renders new word button when word has been guessed", () => {});
});

describe("redux props", () => {
  test("has a success piece of state as prop", () => {});
  test("`getNewWord` action creator is a function prop", () => {});
});

describe("`getNewWord` action creator call", () => {
  test("`getNewWord` action creator runs on NewWord button click", () => {});
  test("clears guessed words list", () => {});
  test("gets new secret word", () => {});
});
