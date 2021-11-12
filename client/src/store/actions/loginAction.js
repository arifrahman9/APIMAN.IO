import axios from "axios";
import { SET_USERDATA } from "../actionType";
const server = process.env.REACT_APP_BASE_URL;

export function setUserdata(payload) {
  return {
    type: SET_USERDATA,
    payload,
  };
}

export function login(data) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios({
        method: "POST",
        url: `${server}/login`,
        data,
      })
        .then((result) => {
          dispatch(fetchUserdata(result.data.access_token));
          resolve(result.data);
        })
        .catch((err) => {
          reject(err.response.data.message);
        });
    });
  };
}

export function fetchUserdata(access_token) {
  return (dispatch, getState) => {
    axios({
      url: `${server}/users/profile`,
      headers: {
        access_token,
      },
    })
      .then((result) => {
        dispatch(setUserdata(result.data));
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };
}
