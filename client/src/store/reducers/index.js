import { combineReducers } from "redux";
import loginReducer from "./loginReducers";
import historyReducer from "./historyReducer";
import collectionReducer from "./collectionReducer";
import profileReducer from "./profileReducers"

const reducers = combineReducers({
  loginReducer,
  historyReducer,
  collectionReducer,
  profileReducer
});

export default reducers;
