import instance from "./instance";
import { CREATE_MESSAGE, FETCH_MESSAGES } from "./types";

export const createMessage = (message) => {
  return {
    type: CREATE_MESSAGE,
    payload: message,
  };
};
export const fetchMessages = () => {
  return async (dispatch) => {
    try {
      const res = await instance.get("/messages");
      console.log(res.data);
      dispatch({
        type: FETCH_MESSAGES,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
