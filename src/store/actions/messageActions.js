import instance from "./instance";
import {
  CREATE_MESSAGE,
  FETCH_MESSAGES,
  DELETE_MESSAGE,
  DELETE_MESSAGE_FROM_BOTH,
  UPDATE_MESSAGE,
} from "./types";

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

      dispatch({
        type: FETCH_MESSAGES,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
export const deleteMessage = (messageId) => {
  return async (dispatch) => {
    try {
      await instance.delete(`/message/${messageId}`);
      dispatch({
        type: DELETE_MESSAGE,
        payload: {
          messageId: messageId,
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
export const deleteMessageFromBoth = (messageId) => {
  return {
    type: DELETE_MESSAGE_FROM_BOTH,
    payload: messageId,
  };
};


export const updateMessage = (updatedMessage) => {
  return {
    type: UPDATE_MESSAGE,
    payload: updatedMessage,
  };
};