import {
  CREATE_MESSAGE,
  FETCH_MESSAGES,
  DELETE_MESSAGE,
  DELETE_MESSAGE_FROM_BOTH,
} from "../actions/types";

const initialState = {
  messages: [],

  loading: true,
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_MESSAGE_FROM_BOTH:
      const messageToKeep = state.messages.filter(
        (message) => message.id !== action.payload.messageId
      );
      return {
        ...state,
        messages: messageToKeep,
      };
    case DELETE_MESSAGE:
      const messagesToKeep = state.messages.filter(
        (message) => message.id !== action.payload.messageId
      );
      return {
        ...state,
        messages: messagesToKeep,
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
