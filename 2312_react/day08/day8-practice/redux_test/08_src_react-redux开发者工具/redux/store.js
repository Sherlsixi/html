import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import countReducer from "./reducers/count";
import personReducer from "./reducers/person";
import { thunk } from "redux-thunk";

const allReducer = combineReducers({
  count: countReducer,
  persons: personReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  allReducer,
  composeEnhancers(applyMiddleware(thunk))
);
