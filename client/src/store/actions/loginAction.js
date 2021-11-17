import axios from "axios";
import { SET_USERDATA, SET_USERDATA_LOADING } from "../actionType";
import { server } from "../../apis/server";

export function setUserdata(payload) {
  return {
    type: SET_USERDATA,
    payload,
  };
}

export function loadingUserdata(payload) {
  return {
    type: SET_USERDATA_LOADING,
    payload,
  };
}

export function login(data) {
  return (dispatch, getState) => {
    dispatch(loadingUserdata(true));
    return new Promise((resolve, reject) => {
      axios({
        method: "POST",
        url: `${server}/login`,
        data,
      })
        .then((result) => {
          resolve(result.data);
        })
        .catch((err) => {
          reject(err.response.data.message);
        })
        .finally(() => {
          dispatch(loadingUserdata(false));
        });
    });
  };
}

export function fetchUserdata() {
  const access_token = localStorage.getItem("access_token");
  return (dispatch, getState) => {
    dispatch(loadingUserdata(true));
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
      })
      .finally(() => {
        dispatch(loadingUserdata(false));
      });
  };
}
