import axios from "axios";
import { SET_REQUESTS, SET_REQUESTS_LOADING, ADD_REQUEST_LOADING, DEL_REQUEST_LOADING, IMPORT_REQUEST_LOADING } from "../actionType";
import { server } from "../../apis/server";
import { postHistory } from "./historiesAction";

export function setRequests(payload) {
  return {
    type: SET_REQUESTS,
    payload,
  };
}

export function loadingRequest(type, payload) {
  return {
    type,
    payload,
  };
}

function helpers(requestValue) {
  let processedRequestValue = {};

  requestValue.forEach((el) => {
    processedRequestValue[el.key] = el.value;
  });

  return processedRequestValue;
}

export function postRequest(method, url, bodies, headers, params, bodyIsRaw) {
  const found = url.includes("http://localhost");
  const access_token = localStorage.getItem("access_token");

  return (dispatch, getState) => {
    dispatch(loadingRequest(ADD_REQUEST_LOADING, true));
    return new Promise((resolve, reject) => {
      if (found) {
        if (params) params = helpers(params);
        if (headers) headers = helpers(headers);
        if (bodies) {
          if (!bodyIsRaw) {
            bodies = helpers(bodies);
          } else {
            bodies = JSON.parse(bodies);
          }
        }

        let axiosOptions = { method, url, params, headers, data: bodies };
        axios.interceptors.request.use((response) => {
          response.meta = response.meta || {};
          response.meta.requestStartedAt = new Date().getTime();
          return response;
        });

        axios.interceptors.response.use((response) => {
          return response;
        });

        let success;
        axios(axiosOptions)
          .then((response) => {
            success = {
              status: `${response.status} ${response.statusText}`,
              response: response.data,
              responseTime: new Date().getTime() - response.config.meta.requestStartedAt,
            };

            return dispatch(postHistory({ method, url, params, headers, bodies }));
          })
          .then((newAddedHistory) => {
            resolve({ ...success, newAddedHistory });
          })
          .catch((err) => {
            reject({
              status: `${err.response.status} ${err.response.statusText}`,
              response: err.response.data,
              responseTime: new Date().getTime() - err.response.config.meta.requestStartedAt,
            });
          })
          .finally(() => {
            dispatch(loadingRequest(ADD_REQUEST_LOADING, false));
          });
      } else {
        axios({
          method: "POST",
          url: `${server}/requests`,
          headers: {
            access_token,
          },
          data: { method, url, bodies, headers, params, bodyIsRaw },
        })
          .then((result) => {
            resolve(result.data);
          })
          .catch((err) => {
            reject(err.response.data);
          })
          .finally(() => {
            dispatch(loadingRequest(ADD_REQUEST_LOADING, false));
          });
      }
    });
  };
}

export function fetchRequests() {
  const access_token = localStorage.getItem("access_token");
  return (dispatch, getState) => {
    dispatch(loadingRequest(SET_REQUESTS_LOADING, true));
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
          dispatch(loadingRequest(SET_REQUESTS_LOADING, false));
        });
    });
  };
}

export function importRequest(requests) {
  const access_token = localStorage.getItem("access_token");
  let formData = new FormData();
  formData.append("requests", requests);

  return (dispatch, getState) => {
    dispatch(loadingRequest(IMPORT_REQUEST_LOADING, true));
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
          dispatch(loadingRequest(IMPORT_REQUEST_LOADING, false));
        });
    });
  };
}

export function deleteRequest(id) {
  const access_token = localStorage.getItem("access_token");
  return (dispatch, getState) => {
    dispatch(loadingRequest(DEL_REQUEST_LOADING, true));
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
        })
        .catch((err) => {
          // reject(err.response.data.message);
          console.log(err.response.data.message);
        })
        .finally(() => {
          dispatch(loadingRequest(DEL_REQUEST_LOADING, false));
        });
    });
  };
}
