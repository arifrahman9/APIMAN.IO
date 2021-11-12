import { combineReducers } from "redux";
import loginReducer from "./loginReducers";

const reducers = combineReducers({
  loginReducer,
});

export default reducers;
