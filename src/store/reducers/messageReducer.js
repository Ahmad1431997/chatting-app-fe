import {
  CREATE_MESSAGE,
  FETCH_MESSAGES,
  DELETE_MESSAGE,
} from "../actions/types";

const initialState = {
  messages: [],

  loading: true,
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_MESSAGE:
      const messageToKeep = state.messages.filter(
        (message) => message.id !== action.payload.messageId
      );
      return {
        ...state,
        messages: messageToKeep,
      };
    case CREATE_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case FETCH_MESSAGES:
      return {
        ...state,
        messages: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default messageReducer;
