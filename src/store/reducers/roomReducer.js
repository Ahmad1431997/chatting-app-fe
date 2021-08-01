import { FETCH_ROOMS, NEW_ROOM } from "../actions/types";

const initialState = {
  rooms: [],
};

const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEW_ROOM:
      const { room } = action.payload;
      return {
        ...state,
        rooms: [...state.rooms, room],
      };
    case FETCH_ROOMS:
      return {
        ...state,
        rooms: action.payload,
      };
    default:
      return state;
  }
};

export default roomReducer;
