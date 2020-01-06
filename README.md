# React Testing with Jest and Enzyme

## 1. Introduction to Jest, Enzyme and TDD

## 2. Simple React App Click Counter

- Set up a simple React app with Jest and Enzyme
- Used Enzyme's `shallow()` function to render a component
- `shallow()` replaces child components with placeholders, but we never actually used this feature in this project
- Tested that required DOM elements were rendered using `find()`
- Made the selector to look for `data-test` attribute
- Tested state using Enzyme's `setState()` and `state()` on `ShallowWrapper` objects
- Used `simulate()` to interact with rendered elements (clicked button)
- Tested components for updates after interaction
- Created re-usable `setup()` and `findByTestAttr()` functions

### Summary of Abstractions

- `findByTestAttr` in _test/testUtils.js_
- `checkProps` in _test/testUtils.js_
  - General prop testing strategy: pass a "supposedly working" prop and check that it doesn't throw.
- Did not abstract `setup()`
  - Too different for each component
- Enzyme adapter in `setupTests.js`
  - Jest runs this before every test
- **Caution**: too many abstractions => hard-to-read tests
  - Less useful in diagnosing failing tests
  - Find a balance between less-lines-of-code and readability

## 3. Zotto App

#### Components

- App
  - Title, contains children components
- Input
  - Input control and submit button
- GuessedWords
  - Table of guessed words and matching letter count
- Congrats
  - Congrats message

#### Simple Redux

- Work with `success` piece of state
  - has the secret word been guessed?
- Action creator creates `CORRECT_GUESS` action
- Reducer updates `success`
- `Input` conditionally renders
  - If `success` is false
- `Congrats` renders when `success` is true

#### Redux Thunk

- Action creators that fire off multiple actions
- `guessWord`
  - Add to `guessedWords`
  - Conditionally update `success`

#### Async action creators and Axios

- Test action creator that fetches `secretWord` from a server
- Using `moxios` to avoid connecting to server

#### Redux Props in Connected Components

- Test state and action creator props in
  - `Input`
  - `App`
- Test action creator calls

#### `success` State Planning

- **Plan** -> test -> code
- Action creator for `CORRECT_GUESS` action
- Success reducer
  - Updates `success` piece of state
  - Initial value: `false`
  - Sets `success: true` upon `CORRECT_GUESS` action

#### Input Redux Store Interactions

- Consult `success` piece of state
- Add to `guessedWords` and update `success`
- Action creator discussed later in **Redux THunk**
- This section: Look at `success` and how it affects input display

### Notes: Unit testing on action creators and reducers

#### Skip action creator / reducer unit testing?

- Only do integration tests on API
  - test points of user interaction and check if it properly updates store state.
- Action creators/ reducers are implementation detail
  - As long as the API doesn't change, you can make changes in action creators and reducers without testing them.

#### Tradeoffs for skipping unit tests

##### Pros

- Fewer tests to maintain
- Less test refactoring when refactoring code

##### Cons

- Hard to diagnose when tests fail
  - Integration test generally covers large area of code and it can be hard to pinpoint the source of the problem
  - Granular tests make it easier to locate the problem

> Unit test action creators and reducers when they become sufficiently complex (e.g. including long and complex logic)
