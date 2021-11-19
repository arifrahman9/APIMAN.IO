import { SET_USERPROFILE } from "../actionType";

export default function profileReducer (state = {userProfile: {}}, action) {
  if (action.type === SET_USERPROFILE) {
    return { ...state, userProfile: action.payload}
  }
  return state
}