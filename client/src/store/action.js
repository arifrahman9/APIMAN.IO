import { SET_MESSAGE } from "./actionType";

export function setMessage(payload) {
  return {
    type: SET_MESSAGE,
    payload,
  };
}
