import axios from "axios";
import { SET_COLLECTIONS } from "../actionType";
const server = process.env.REACT_APP_BASE_URL;

export function setCollections(payload) {
  return {
    type: SET_COLLECTIONS,
    payload,
  };
}

export function fetchCollections() {
  const access_token = localStorage.getItem("access_token");
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios({
        url: `${server}/collections`,
        headers: {
          access_token,
        },
      })
        .then((result) => {
          console.log(result.data);
          dispatch(setCollections(result.data));
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    });
  };
}
