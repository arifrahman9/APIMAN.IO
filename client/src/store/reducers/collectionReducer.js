import { SET_COLLECTIONS } from "../actionType";

const initialState = {
  collections: [],
};

export default function collectionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_COLLECTIONS:
      return { ...state, collections: action.payload };
    default:
      return state;
  }
}
