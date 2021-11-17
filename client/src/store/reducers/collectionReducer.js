import { SET_COLLECTIONS, SET_COLLECTIONS_LOADING, ADD_COLLECTION_LOADING, DEL_COLLECTION_LOADING, PATCH_COLLECTION_LOADING } from "../actionType";

const initialState = {
  collections: [],
  isLoading: false,
  addLoading: false,
  delLoading: false,
  patchLoading: false,
};

export default function collectionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_COLLECTIONS:
      return { ...state, collections: action.payload };
    case SET_COLLECTIONS_LOADING:
      return { ...state, isLoading: action.payload };
    case ADD_COLLECTION_LOADING:
      return { ...state, addLoading: action.payload };
    case DEL_COLLECTION_LOADING:
      return { ...state, delLoading: action.payload };
    case PATCH_COLLECTION_LOADING:
      return { ...state, patchLoading: action.payload };
    default:
      return state;
  }
}
