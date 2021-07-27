import { SET_USER } from "./types";

import instance from "./instance";
import decode from "jwt-decode";



//signup action
export const signup = (userData, history) => {
  return async (dispatch) => {
    try {
      const res = await instance.post("/signup", userData);
      dispatch(setUser(res.data.token));
      history.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };
};

//signin action
export const signin = (userData, history) => {
  return async (dispatch) => {
    try {
      const res = await instance.post("/signin", userData);
      dispatch(setUser(res.data.token));
      history.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };
};



const setUser = (token) => {
  if (token) {
    localStorage.setItem("myToken", token);
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
    return {
      type: SET_USER,
      payload: decode(token),
    };
  } else {
    localStorage.removeItem("myToken");
    delete instance.defaults.headers.common.Authorization;
    return {
      type: SET_USER,
      payload: null,
    };
  }
};

export const checkForToken = () => {
  const  token = localStorage.getItem("myToken");

  if (token) {
    //check if token expiered or not when the user refresh the page
    const currentTime = Date.now();
    const user = decode(token);

    if (user.exp > currentTime) {
      return setUser(token);
    }
  }
  return setUser();
};
