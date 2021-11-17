import axios from "axios";
import { server } from "../../apis/server";
import { loadingUserdata } from "./loginAction";

export function postRegister(data) {
  return (dispatch, getState) => {
    dispatch(loadingUserdata(true));
    return new Promise((resolve, reject) => {
      axios({
        method: "POST",
        url: `${server}/register`,
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
