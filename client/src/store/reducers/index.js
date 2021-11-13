import { combineReducers } from "redux";
import loginReducer from "./loginReducers";
import historyReducer from "./historyReducer";

const reducers = combineReducers({
  loginReducer,
  historyReducer,
});

export default reducers;
