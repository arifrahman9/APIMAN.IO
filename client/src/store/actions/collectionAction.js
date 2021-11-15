import axios from "axios";
import { SET_COLLECTIONS, SET_COLLECTIONS_LOADING } from "../actionType";
import { server } from "../../apis/server";

export function setCollections(payload) {
  return {
    type: SET_COLLECTIONS,
    payload,
  };
}

export function loadingCollection(payload) {
  return {
    type: SET_COLLECTIONS_LOADING,
    payload,
  };
}

export function fetchCollections() {
  const access_token = localStorage.getItem("access_token");
  return (dispatch, getState) => {
    dispatch(loadingCollection(true));
    return new Promise((resolve, reject) => {
      axios({
        url: `${server}/collections`,
        headers: {
          access_token,
        },
      })
        .then((result) => {
          dispatch(setCollections(result.data));
        })
        .catch((err) => {
          console.log(err.response.data.message);
        })
        .finally(() => {
          dispatch(loadingCollection(false));
        });
    });
  };
}

export function postCollection(data) {
  const access_token = localStorage.getItem("access_token");
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios({
        method: "POST",
        url: `${server}/collections`,
        headers: {
          access_token,
        },
        data,
      })
        .then((result) => {
          console.log(result.data[0]);
          getState().collectionReducer.collections.push(result.data[0]);
          resolve(result.data);
        })
        .catch((err) => {
          reject(err.response.data.message);
        });
    });
  };
}
