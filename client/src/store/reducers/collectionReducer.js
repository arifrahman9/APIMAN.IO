import { SET_COLLECTIONS, SET_COLLECTIONS_LOADING } from "../actionType";

const initialState = {
  collections: [],
  isLoading: false,
};

export default function collectionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_COLLECTIONS:
      return { ...state, collections: action.payload };
    case SET_COLLECTIONS_LOADING:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}
