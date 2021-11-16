import axios from "axios";
import { SET_REQUESTS, SET_REQUESTS_LOADING } from "../actionType";
import { server } from "../../apis/server";

export function setRequests(payload) {
  return {
    type: SET_REQUESTS,
    payload,
  };
}

export function loadingRequest(payload) {
  return {
    type: SET_REQUESTS_LOADING,
    payload,
  };
}

export function postRequest(method, url, bodies, headers, params, bodyIsRaw) {
  const access_token = localStorage.getItem("access_token");
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios({
        method: "POST",
        url: `${server}/requests`,
        headers: {
          access_token,
        },
        data: {
          method,
          url,
          bodies,
          headers,
          params,
          bodyIsRaw,
        },
      })
        .then((result) => {
          resolve(result.data);
        })
        .catch((err) => {
          reject(err.response.data);
        });
    });
  };
}

export function fetchRequests() {
  const access_token = localStorage.getItem("access_token");
  return (dispatch, getState) => {
    dispatch(loadingRequest(true));
    return new Promise((resolve, reject) => {
      axios({
        url: `${server}/requests`,
        headers: {
          access_token,
        },
      })
        .then((result) => {
          dispatch(setRequests(result.data));
          resolve(result.data);
        })
        .catch((err) => {
          reject(err.response.data.message);
        })
        .finally(() => {
          dispatch(loadingRequest(false));
        });
    });
  };
}

export function importRequest(requests) {
  const access_token = localStorage.getItem("access_token");
  let formData = new FormData();
  formData.append("requests", requests);

  return (dispatch, getState) => {
    dispatch(loadingRequest(true));
    return new Promise((resolve, reject) => {
      axios({
        method: "POST",
        url: `${server}/requests/read`,
        headers: {
          access_token,
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      })
        .then((result) => {
          const requests = getState().requestReducer.requests;
          requests.unshift(...result.data);
          resolve(result.data);
          console.log(result.data);
        })
        .catch((err) => {
          reject(err.response.data.message);
          console.log(err.response.data.message);
        })
        .finally(() => {
          dispatch(loadingRequest(false));
        });
    });
  };
}

export function deleteRequest(id) {
  const access_token = localStorage.getItem("access_token");
  return (dispatch, getState) => {
    dispatch(loadingRequest(true));
    return new Promise((resolve, reject) => {
      axios({
        method: "DELETE",
        url: `${server}/requests/${id}`,
        headers: {
          access_token,
        },
      })
        .then((result) => {
          const newRequests = getState().requestReducer.requests.filter((req) => req._id !== id);
          dispatch(setRequests(newRequests));
          resolve(result.data);
          // console.log(result.data);
        })
        .catch((err) => {
          // reject(err.response.data.message);
          console.log(err.response.data.message);
        })
        .finally(() => {
          dispatch(loadingRequest(false));
        });
    });
  };
}
