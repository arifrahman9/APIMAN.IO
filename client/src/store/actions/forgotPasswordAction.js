import axios from "axios";
import { server } from "../../apis/server";

export const requestForgotPassword = (email) => {
  return function (dispatch) {
    return new Promise((resolve, reject) => {
      axios({
        url: server + "/forgot-password",
        method: "POST",
        data: { email },
      })
        .then(({ data }) => {
          resolve(data);
        })
        .catch(({ response }) => {
          reject(response);
        });
    });
  };
};
