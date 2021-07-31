import { NEW_ROOM} from "./types";
import instance from "./instance";

export const createRoom = (newRoom) => {
  return async (dispatch) => {
    try {
        // if(user)
        // console.log("hello")
        console.log(newRoom)
      const res = await instance.post("/newroom", newRoom);
      dispatch({
        type: NEW_ROOM,
        payload: {
          room: res.data,
        },
      });
      console.log(res.data)
    } catch (error) {
      console.log(error.message);
    }
  };
};

