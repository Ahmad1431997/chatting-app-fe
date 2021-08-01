import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";
import { checkForToken, fetchUsers } from "../actions/authActions";
import { fetchMessages } from "../actions/messageActions";
import { fetchRooms } from "../actions/roomActions";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

store.dispatch(checkForToken());
store.dispatch(fetchUsers());
store.dispatch(fetchMessages());
store.dispatch(fetchRooms());

export default store;
