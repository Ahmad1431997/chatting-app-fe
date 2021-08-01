import { CREATE_MESSAGE, FETCH_MESSAGES } from "../actions/types";

const initialState = {
  messages: [],
  // messages:[
  //   {id:1,text:"hello roomId-1",senderId:5,roomId:1},
  //   {id:2,text:"hello roomId-2",senderId:5,roomId:2},
  //   {id:3,text:"hello roomId-3",senderId:5,roomId:3},
  // ]
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
      };

    default:
      return state;
  }
};

export default messageReducer;
