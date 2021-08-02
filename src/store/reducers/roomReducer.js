import { FETCH_ROOMS, NEW_ROOM } from "../actions/types";

const initialState = {
  rooms: [],
  loading: true,
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
        loading: false,
      };
    default:
      return state;
  }
};

export default roomReducer;
