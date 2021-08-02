import { CREATE_MESSAGE, FETCH_MESSAGES } from "../actions/types";

const initialState = {
  messages: [],

  loading: true,
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
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
