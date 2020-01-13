import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, checkProps } from "../test/testUtils";
import GuessedWords from "./GuessedWords";

const defaultProps = {
  guessedWords: [{ guessedWord: "train", letterMatchCount: 3 }]
};

/**
 * Factory function to create a ShallowWrapper for the GuessedWords component.
 * @function setup
 * @param {object} props - Component props specific to this setup.
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<GuessedWords {...setupProps} />);
};

// negative test: will pass if we do nothing
test("does not throw warning with expected props", () => {
  checkProps(GuessedWords, defaultProps);
});

describe("if there are no words guessed", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({ guessedWords: [] });
  });
  test("renders without error", () => {
    const component = findByTestAttr(
      wrapper,
      "component-guessed-words"
    );
    expect(component.length).toBe(1);
  });
  test("renders an instructions to guess a word", () => {
    const instructions = findByTestAttr(
      wrapper,
      "guess-instructions"
    );
    expect(instructions.text().length).not.toBe(0);
  });
});

describe("if there are words guessed", () => {
  const guessedWords = [
    { guessedWord: "train", letterMatchCount: 3 },
    { guessedWord: "agile", letterMatchCount: 1 },
    { guessedWord: "party", letterMatchCount: 5 }
  ];
  let wrapper;
  beforeEach(() => {
    wrapper = setup({ guessedWords });
  });

  test("renders without error", () => {
    const component = findByTestAttr(
      wrapper,
      "component-guessed-words"
    );
    expect(component.length).toBe(1);
  });
  test("renders 'guessed words' section", () => {
    const guessedWordsNode = findByTestAttr(wrapper, "guessed-words");
    expect(guessedWordsNode.length).toBe(1);
  });
  test("correct number of guessed words shown", () => {
    const guessedWordNodes = findByTestAttr(wrapper, "guessed-word");
    expect(guessedWordNodes.length).toBe(guessedWords.length);
  });
  test("renders `guess number` column", () => {
    const guessNumberNodes = findByTestAttr(wrapper, "guess-number");
    expect(guessNumberNodes.length).toBeGreaterThanOrEqual(1);
  });
  test("renders correct guess number next to guessed word", () => {
    const guessNumberNodes = findByTestAttr(wrapper, "guess-number");
    const lastNumber = guessNumberNodes.length;
    expect(+guessNumberNodes[lastNumber - 1].text()).toBe(lastNumber);
  });
});
