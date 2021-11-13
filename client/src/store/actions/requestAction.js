import axios from "axios";
const server = process.env.REACT_APP_BASE_URL;

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
          // console.log(result.data, ">>>>>>>>>>>>>nice");
        })
        .catch((err) => {
          reject(err.response.data);
          // console.log(err.response.data, ">>>>>>>>>>>>>error gais");
        });
    });
  };
}
