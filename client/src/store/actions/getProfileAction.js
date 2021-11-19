import { SET_USERPROFILE } from "../actionType";
import axios from "axios";
import { server } from "../../apis/server";

export const setUserProfile = (data) => {
  return {
    type: SET_USERPROFILE,
    payload: data,
  };
};

export const fetchUserProfile = (access_token) => {
  return function (dispatch) {
    axios({
      url: server + "/users/profile",
      headers: { access_token },
      method: "GET",
    })
      .then(({ data }) => {
        dispatch(setUserProfile(data));
      })
      .catch(({ response }) => {
        console.log(response);
      });
  };
};
