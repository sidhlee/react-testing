import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const composeEnhancers =
  (process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        trace: true,
        tracklimit: 25
      })
    : null) || compose;

export const middlewares = [thunk];
const enhancer = composeEnhancers(applyMiddleware(...middlewares));

export default createStore(rootReducer, enhancer);
