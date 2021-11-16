import axios from "axios";
import { SET_RESULTS, SET_RESULTS_LOADING } from "../actionType";
import { server } from "../../apis/server";

export function setResults(payload) {
  return {
    type: SET_RESULTS,
    payload,
  };
}

export function loadingResult(payload) {
  return {
    type: SET_RESULTS_LOADING,
    payload,
  };
}

export function fetchResults() {
  const access_token = localStorage.getItem("access_token");
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios({
        url: `${server}/results`,
        headers: {
          access_token,
        },
      })
        .then((result) => {
          console.log(result.data);
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    });
  };
}

export function postResult(header, content) {
  const access_token = localStorage.getItem("access_token");
  const code = header.status.split(" ")[0];
  const status = header.status.split(" ")[1];
  const responseTime = header.responseTime.split(" ")[0];
  const data = {
    content,
    status,
    code,
    responseTime,
    responseSize: "0",
  };
  console.log(data);

  return (dispatch, getState) => {
    dispatch(loadingResult(true));
    return new Promise((resolve, reject) => {
      axios({
        method: "POST",
        url: `${server}/results`,
        headers: {
          access_token,
        },
        data,
      })
        .then((result) => {
          console.log(result.data);
          resolve(result.data);
        })
        .catch((err) => {
          console.log(err.response.data.message);
          reject(err.response.data.message);
        })
        .finally(() => {
          dispatch(loadingResult(false));
        });
    });
  };
}
