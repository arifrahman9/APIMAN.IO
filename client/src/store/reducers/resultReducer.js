import { SET_RESULTS, SET_RESULTS_LOADING, ADD_RESULT_LOADING, DEL_RESULT_LOADING } from "../actionType";

const initialState = {
  results: [],
  isLoading: false,
  addLoading: false,
  delLoading: false,
};

export default function resultReducer(state = initialState, action) {
  switch (action.type) {
    case SET_RESULTS:
      return { ...state, results: action.payload };
    case SET_RESULTS_LOADING:
      return { ...state, isLoading: action.payload };
    case ADD_RESULT_LOADING:
      return { ...state, addLoading: action.payload };
    case DEL_RESULT_LOADING:
      return { ...state, delLoading: action.payload };
    default:
      return state;
  }
}
