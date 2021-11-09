import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { SET_MESSAGE } from "./actionType";

const initialState = {
  message: "Hello world",
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_MESSAGE:
      return { ...state, message: action.payload };
    default:
      return state;
  }
}

const store = createStore(reducer, applyMiddleware(thunk));
export default store;
