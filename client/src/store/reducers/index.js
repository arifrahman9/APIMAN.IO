import { combineReducers } from "redux";
import loginReducer from "./loginReducers";
import historyReducer from "./historyReducer";
import collectionReducer from "./collectionReducer";

const reducers = combineReducers({
  loginReducer,
  historyReducer,
  collectionReducer,
});

export default reducers;
