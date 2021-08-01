import { FETCH_ROOMS, NEW_ROOM } from "./types";
import instance from "./instance";

export const createRoom = (newRoom) => {
  return async (dispatch) => {
    try {
      const res = await instance.post("/newroom", newRoom);
      dispatch({
        type: NEW_ROOM,
        payload: {
          room: res.data,
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
export const fetchRooms = () => {
  return async (dispatch) => {
    try {
      const res = await instance.get("/rooms");

      dispatch({
        type: FETCH_ROOMS,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
