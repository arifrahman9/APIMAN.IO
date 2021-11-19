import { combineReducers } from "redux";
import collectionReducer from "./collectionReducer";
import loginReducer from "./loginReducers";
import historyReducer from "./historyReducer";
import profileReducer from "./profileReducers";
import resultReducer from "./resultReducer";
import requestReducer from "./requestReducer";

const reducers = combineReducers({
  collectionReducer,
  historyReducer,
  loginReducer,
  profileReducer,
  resultReducer,
  requestReducer,
});

export default reducers;
