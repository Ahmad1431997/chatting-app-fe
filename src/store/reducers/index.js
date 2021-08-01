import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";
import { checkForToken, fetchUsers } from "../actions/authActions";
import { fetchMessages } from "../actions/messageActions";
import { fetchRooms } from "../actions/roomActions";
import { fetchProfiles } from "../actions/profileActions";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

store.dispatch(checkForToken());
store.dispatch(fetchUsers());
store.dispatch(fetchMessages());
store.dispatch(fetchRooms());
store.dispatch(fetchProfiles());

export default store;
