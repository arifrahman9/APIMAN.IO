import { SET_REQUESTS, SET_REQUESTS_LOADING } from "../actionType";

const initialState = {
  requests: [],
  isLoading: false,
};

export default function requestReducer(state = initialState, action) {
  switch (action.type) {
    case SET_REQUESTS:
      return { ...state, requests: action.payload };
    case SET_REQUESTS_LOADING:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}
