import { SET_RESULTS, SET_RESULTS_LOADING } from "../actionType";

const initialState = {
  results: [],
  isLoading: false,
};

export default function resultReducer(state = initialState, action) {
  switch (action.type) {
    case SET_RESULTS:
      return { ...state, results: action.payload };
    case SET_RESULTS_LOADING:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}
