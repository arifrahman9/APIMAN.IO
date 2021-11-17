import { SET_REQUESTS, SET_REQUESTS_LOADING, ADD_REQUEST_LOADING, DEL_REQUEST_LOADING, IMPORT_REQUEST_LOADING } from "../actionType";

const initialState = {
  requests: [],
  isLoading: false,
  addLoading: false,
  delLoading: false,
  importLoading: false,
};

export default function requestReducer(state = initialState, action) {
  switch (action.type) {
    case SET_REQUESTS:
      return { ...state, requests: action.payload };
    case SET_REQUESTS_LOADING:
      return { ...state, isLoading: action.payload };
    case ADD_REQUEST_LOADING:
      return { ...state, addLoading: action.payload };
    case DEL_REQUEST_LOADING:
      return { ...state, delLoading: action.payload };
    case IMPORT_REQUEST_LOADING:
      return { ...state, importLoading: action.payload };
    default:
      return state;
  }
}
