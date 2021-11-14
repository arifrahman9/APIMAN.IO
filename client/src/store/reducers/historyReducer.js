import { SET_HISTORIES, SET_HISTORIES_LOADING } from "../actionType";

const initialState = {
  histories: [],
  isLoading: false,
};

export default function historyReducer(state = initialState, action) {
  switch (action.type) {
    case SET_HISTORIES:
      return { ...state, histories: action.payload };
    case SET_HISTORIES_LOADING:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}
