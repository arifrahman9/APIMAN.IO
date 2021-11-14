import { SET_HISTORIES } from "../actionType";

const initialState = {
  histories: [],
  isLoading: false,
};

export default function historyReducer(state = initialState, action) {
  switch (action.type) {
    case SET_HISTORIES:
      return { ...state, histories: action.payload };
    default:
      return state;
  }
}
