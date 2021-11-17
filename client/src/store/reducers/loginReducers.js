import { SET_USERDATA, SET_USERDATA_LOADING } from "../actionType";

const initialState = {
  userdata: {},
  isLoading: false,
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USERDATA:
      return { ...state, userdata: action.payload };
    case SET_USERDATA_LOADING:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}
