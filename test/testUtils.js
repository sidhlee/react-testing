import checkPropTypes from "check-prop-types";
import { createStore } from "redux";

import rootReducer from "../src/reducers";

/* 
We are testing Input which is wrapped in redux's connect() and exported.
In our actual app, <Input /> will be within <App /> which is wrapped in <Provider />

For our tests, we need to create a fresh store that matches configuration for the actual store and pass it as props for each test. Otherwise, you'll get this error in the console:

Invariant Violation: Could not find "store" in the context of "Connect(Input)". Either wrap the root component in a <Provider>, or pass a custom React context provider to <Provider> and the corresponding React context consumer to Connect(Input) in connect options.
*/

/**
 * Create a testing store with imported reducers, middleware, and initial state.
 * globals: rootReducer.
 * @function storeFactory
 * @param {object} initialState - Initial state for store.
 * @returns {Store} - Redux store.
 */
export const storeFactory = initialState => {
  return createStore(rootReducer, initialState);
};

/**
 * Return node(s) with the given data-test attribute.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper.
 * @param {String} val - Value of data-test attribute for search.
 * @returns {ShallowWrapper}
 */
export const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};

export const checkProps = (component, expectedProps) => {
  const propError = checkPropTypes(
    component.propTypes,
    expectedProps,
    "prop",
    component.name
  );
  expect(propError).toBeUndefined();
};
