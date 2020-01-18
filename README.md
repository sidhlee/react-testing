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

## `success` State Planning

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

### Connected Component Setup

1. Create a `storeFactory` utility

- Creates a testing store with reducers from the actual app
- Will eventually add middlewares

2. Add store as prop to our connected component within the test
3. Use `shallow` to create a virtual DOM of the connected component
4. Use `.dive()` to get the child of the connected component (Input)

#### Choice 1: Use actual store, not mock store

- `redux-mock-store` can test intermediate actions
  - Such as `loading` while fetching data
- Mocked store cannot test changes to state. It only shows you the series of actions.
- Actual store is closer to the real app
- Mocks are always one step removed from the real app

#### Choice 2: Test with connected component

- You can export component before it's connected and test it
- Redux docs recommends testing unconnected component
- Enzyme strongly recommends testing connected component with `dive()`

| Connected Component                                       | Non-connected component                                                                    |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| closer to app                                             | further from app                                                                           |
| can work with store and see how it is affected by actions | can pass mock action creators as props to check if it is called at the right point in time |

### Action Creator and Reducer

#### Test a simple action creator

- Just a function returning an object!

#### Test a simple reducer

- Just a function that returns state!

### Set up Connected Component with Store

#### Enzyme `ShallowWrapper.dive()`

- Get to the child component from connected HOC (`<ContextProvider />`)

#### `storeFactory`

- Create a store for each test with app settings

## `guessedWords` Planning

### Action creator: `guessWord`

- Function that takes a `guessedWord` string
- Use helper function to calculate `letterMatchCount`
- Always dispatch action `GUESS_WORD`
  - Payload contains `guessedWord` and `letterMatchCount`
- If word is correct, also dispatch `CORRECT_GUESS`
  - We can access `success` piece of state within `guessWord`
- Reducer will update `guessedWords` state

### Complications

- How will we get secretWord to calculate letter match?
- What if the word was guessed successfully?
  - Right place to dispatch `CORRECT_GUESS` to update `success` state

### Redux Thunk!

- Dispatch multiple actions from one action creator
- Access current state within action creator
- Returns a function that takes dispatch as an argument

### No need for `correctGuess` action creator

- `CORRECT_GUESS` will be dispatched from `guessWord`
- Case for argument: skip unit tests on action creators
  - Some wasted effort on testing `correctGuess`
  - which was an _implementation detail_

### `guessedWords` Reducer

- control `guessedWords` piece of state
- Only one action to consider: `GUESS_WORD`
- Add reset feature: clears `guessedWords`

## Redux Thunk Test Planning

#### What we can do with store?

- `store.dispatch(actionCreator())`
- `store.getState()`
  - Returns store object
  - Useful for assertions

#### Testing a Thunk

1. Create a store with initial state

- Will contain `secretWord`

2. Dispatch action creator

- `store.dispatch(guessWord());`

3. Check state

- Use Jest's `.toEqual()` to test state object as a whole

#### This is Integration Testing

- Testing action creator and reducer together
- Where to put tests?
  - Make a new file: _src/integration.test.js_
  - Would separate into many files for a larger app

#### Condition Matrix for Testing

|                        | incorrect guess | correct guess |
| :--------------------: | :-------------: | :-----------: |
|  **no guessed words**  |      test       |     test      |
| **some guessed words** |      test       |     test      |

---

### Thunk Testing Summary

#### Thunk Integration Testing

1. Create a store with initial state
2. Dispatch action creator
3. Check state

## secretWord Plan

Create `getSecretWord` action creator

- Use axios to get random word from server
- Shape of Action

  ```js
  { type: SET_SECRET_WORD, payload: secretWord<string>}
  ```

Create `secretWordReducer`

- Sets `secretWord` upon `SET_SECRET_WORD` action type
  Already set up shell for `guessWord` tests (_./src/integration.test.js_)

### Random Word Server

https://github.com/flyrightsister/udemy-react-testing-projects/tree/master/random-word-server

- Will configure `axios` to send requests to `moxios`

## 7. Testing Axios

Random word server is necessary for actual app but we do not want to test server when testing app.

Using moxios lets us test app

- Without testing server
- Without even running server

### Working with moxios

1. Test installs moxios

```js
// sets moxios as the axios adapter
// Pass axios instance to use configured setting
// Or don't pass anything to use default settings
moxios.install([axiosInstance]);
```

2. Axios will now send req to moxios instead of http
3. Test specifies moxios res

```js
// watches for axios calls
moxios.wait(() => {
  // Access most recent request
  const request = moxios.requests.mostRecent();
  // and to send response:
  request.respondWith({
    status: 200,
    response: secretWord
  });
});
```

4. Test calls action creator
5. Action creator calls axios

## Testing Async Action Creator

1. Create store using `storeFactory([initialState])`;
2. `store.dispatch(asyncActionCreator())` returns promise
3. Put tests in `.then()` callback
4. Tests will run after dispatch completes

---

> **Important!**
> You must see the test fail to ensure that your test function does not exit before running the assertion. If your test function completes without error before promise resolves, the test will pass even though assertion fails after the promise resolves.  
> If they don't fail, it's likely that you didn't return `store.dispatch()` promise.

---

## 8. Redux Components

### Test Component Props from Redux

Do components have access to

- the state they need?
- the action creator they need?

### Test Action Creator Triggers

- Use mocks to "spy" on action creators
- Are they called when expected?
  - `getSecretWord` when `App` mounts
  - `guessWord` when submit is clicked
- Are they called with the right arguments?
  - Input control value for `guessWord`
- You are shallow wrapping "unconnected" component in order to pass jest's spy function instead of the original action creator that is injected with

```js
connect(mapState, {...actionCreators})(unconnectedComponent`)
```

- Make sure to pass required props to the wrapping component which is unconnected from the redux store and therefore not getting pieces of state as props. Otherwise, prop-types will log warnings about missing props that are specified to be required.

```js
test("`getSecretWord` runs on App mount", () => {
  const getSecretWordMock = jest.fn();

  const props = {
    getSecretWord: getSecretWordMock,
    success: false, // required by prop-type
    guessedWords: [], // required by prop-type,
    gaveUp: false // required by prop-type
  };

  // set up app component with getSecretWordMock as the get SecretWord prop
  const wrapper = shallow(<UnconnectedApp {...props} />);

  // run life-cycle method
  wrapper.instance().componentDidMount();

  // check to see if the mock ran
  const getSecretWordCallCount = getSecretWordMock.mock.calls.length;
  expect(getSecretWordCallCount).toBe(1);
});
```

### Testing Redux Props

Components' Access to Redux

- Do components have access to what they need?
  - Piece of state
  - Action creators
- Similar to testing prop types
- Test fails if component no longer receives state or action creators from its HOC

### Testing Input Component

- Needs `success` piece of state
  - If true, don't render input control and submit button
- Needs `guessWord` action creator
  - Fire when the submit button is clicked
- Access these in props, like when we are in component code
  - using `wrapper.instance().props`

### Testing App Component

- Needs `secretWord` piece of state to update
  _- why? don't we need just getSecretWord?`_
- Needs `success` and `guessedWords` pieces of state to pass to its children (dumb) components
- Needs access to `getSecretWord` action creator
  - Will be called in `componentDidMount()` to fetch secret word from the server

### Testing Action Creator Calls

#### Test if `getSecretWord`(_fetch and dispatch_) runs on App mount

- export **unconnected** App component
  - Best way to mock `getSecretWord`
- Pass `getSecretWord` via props
  - Get function from props instead of Redux `connect`
  - Can mock and check that it runs
- With mock function, we can assert on:
  - how many times mock ran during tests
  - with what arguments
- To trigger mock function, we simulate `componentDidMount()` in our test
- Then assert that mock function runs once

#### Test `guessWord` call on submit click

- Similar to `getSecretWord` in the App component
- The tests:
  1. Action creator runs on submit click
  2. Action creator runs with correct argument (input control value)
- Steps for test:
  - Export unconnected Input component
  - Mock `guessWord`
  - Create shallow wrapper of unconnected component
    - With mock as prop
  - Simulate click on submit button
    - Use `findByTestAttr` and Enzyme `simulate()`

#### Test guessWord argument

- `guessWord(inputControlValue<string>)`
- Test `state.value` by using Enzyme `setState()` to simulate input control value
- `ShallowWrapper.simulate(event[, ...args])` takes a mock event object as 2nd argument. We need to provide them if handler method accesses event object.

```js
beforeEach(() => {
  guessWordMock = jest.fn();
  wrapper = shallow(<UnconnectedInput guessWord={guessWordMock} />);
  wrapper.setState({ value: guessedWord });
  const submitButton = findByTestAttr(wrapper, "input-form");
  submitButton.simulate("submit", { preventDefault: () => {} });
});
```
