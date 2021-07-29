import { combineReducers } from "redux";
import authReducer from "./authReducer";
import roomReducer from "./roomReducer";

const rootReducer = combineReducers({
    user : authReducer,
    rooms : roomReducer
  })
  
  export default rootReducer;