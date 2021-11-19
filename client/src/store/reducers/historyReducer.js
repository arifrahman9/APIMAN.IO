import { SET_HISTORIES, SET_HISTORIES_LOADING, ADD_TO_COLL_LOADING, DEL_HISTORY_LOADING } from "../actionType";

const initialState = {
  histories: [],
  isLoading: false,
  addLoading: false,
  delLoading: false,
};

export default function historyReducer(state = initialState, action) {
  switch (action.type) {
    case SET_HISTORIES:
      return { ...state, histories: action.payload };
    case SET_HISTORIES_LOADING:
      return { ...state, isLoading: action.payload };
    case ADD_TO_COLL_LOADING:
      return { ...state, addLoading: action.payload };
    case DEL_HISTORY_LOADING:
      return { ...state, delLoading: action.payload };
    default:
      return state;
  }
}
