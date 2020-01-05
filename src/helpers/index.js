/**
 * @method getLetterMatchCount
 * @param {string} guessedWord - Guessed word.
 * @param {string} secretWord - Secret word.
 * @returns {number} - Number of letters matched between guessedWord and secretWord
 */
export function getLetterMatchCount(guessedWord, secretWord) {
  const secretWordSet = new Set(secretWord.split(""));
  const matchedLetters = [...secretWordSet].filter(letter =>
    guessedWord.includes(letter)
  );
  return matchedLetters.length;
}
