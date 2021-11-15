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
          const sorted = result.data
            .map((col) => col.name)
            .sort((a, b) => {
              if (a > b) {
                return -1;
              }
              if (b > a) {
                return 1;
              }
              return 0;
            });

          console.log(sorted);
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

export function deleteCollection(id) {
  const access_token = localStorage.getItem("access_token");
  return (dispatch, getState) => {
    dispatch(loadingCollection(true));
    return new Promise((resolve, reject) => {
      axios({
        method: "DELETE",
        url: `${server}/collections`,
        headers: {
          access_token,
        },
        data: {
          id,
        },
      })
        .then((result) => {
          const newCollections = getState().collectionReducer.collections.filter((col) => col._id !== result.data._id);
          dispatch(setCollections(newCollections));

          const histories = getState().historyReducer.histories;
          histories.forEach((history) => {
            if (history.CollectionId === result.data._id) {
              delete history.CollectionId;
            }
          });
          resolve(result.data);
        })
        .catch((err) => {
          reject(err.response.data.message);
        })
        .finally(() => {
          dispatch(loadingCollection(false));
        });
    });
  };
}

export function patchCollection(data) {
  const access_token = localStorage.getItem("access_token");
  return (dispatch, getState) => {
    dispatch(loadingCollection(true));
    return new Promise((resolve, reject) => {
      axios({
        method: "PATCH",
        url: `${server}/collections`,
        headers: {
          access_token,
        },
        data,
      })
        .then((result) => {
          const collections = getState().collectionReducer.collections;
          collections.forEach((col, idx) => {
            if (col._id === data.id) {
              collections.splice(idx, 1, result.data);
            }
          });
          // console.log(result.data);
          resolve(result.data);
        })
        .catch((err) => {
          console.log(err.response.data.message);
          reject(err.response.data.message);
        })
        .finally(() => {
          dispatch(loadingCollection(false));
        });
    });
  };
}
