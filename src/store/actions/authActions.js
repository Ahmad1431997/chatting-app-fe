import { FETCH_USERS, SET_USER } from "./types";

import instance from "./instance";
import decode from "jwt-decode";
import { fetchMessages } from "./messageActions";
import { fetchRooms } from "./roomActions";
import { fetchProfiles } from "./profileActions";

//signup action
export const signup = (userData, history) => {
  return async (dispatch) => {
    try {
      const res = await instance.post("/signup", userData);
      dispatch(setUser(res.data.token, dispatch));
      history.push("/main");
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
      dispatch(setUser(res.data.token, dispatch));
      history.push("/main");
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const signout = (history) => {
  history.push("/");
  return setUser();
};

const setUser = (token, dispatch) => {
  if (token) {
    console.log(token);
    localStorage.setItem("myToken", token);
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
    dispatch(fetchUsers());
    dispatch(fetchMessages());
    dispatch(fetchRooms());
    dispatch(fetchProfiles());

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

export const checkForToken = () => async (dispatch) => {
  const token = localStorage.getItem("myToken");

  if (token) {
    //check if token expiered or not when the user refresh the page
    const currentTime = Date.now();
    const user = decode(token);

    if (user.exp > currentTime) {
      dispatch(setUser(token, dispatch));
      return;
    }
  }
  dispatch(setUser());
};

export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const res = await instance.get("/fetch");

      dispatch({
        type: FETCH_USERS,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
