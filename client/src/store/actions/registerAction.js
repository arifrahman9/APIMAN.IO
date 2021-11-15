import axios from "axios";
import { server } from "../../apis/server";

export function postRegister(data) {
  return (dispatch, getState) => {
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
        });
    });
  };
}
