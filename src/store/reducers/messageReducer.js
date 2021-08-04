import {
  CREATE_MESSAGE,
  FETCH_MESSAGES,
  DELETE_MESSAGE,
  DELETE_MESSAGE_FROM_BOTH,
  UPDATE_MESSAGE,
} from "../actions/types";

const initialState = {
  messages: [],

  loading: true,
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_MESSAGE_FROM_BOTH:
      const messageToKeep = state.messages.filter(
        (message) => message.id !== action.payload
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

      case UPDATE_MESSAGE:
      const updatedmessage = action.payload;
      return {
        ...state,
        messages: state.messages.map((message) =>
          message.id === updatedmessage.id ? updatedmessage : message
        ),
      };

    default:
      return state;
  }
};

export default messageReducer;
