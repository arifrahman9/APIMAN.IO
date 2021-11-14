import { SET_USERDATA } from "../actionType";

const initialState = {
  userdata: {},
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USERDATA:
      return { ...state, userdata: action.payload };
    default:
      return state;
  }
}
