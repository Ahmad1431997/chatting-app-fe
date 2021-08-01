import instance from "./instance";
import { FETCH_PROFILE, UPDATE_PROFILE } from "./types";

export const updateProfile = (updatedProfile, profileId) => {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      for (const key in updatedProfile)
        formData.append(key, updatedProfile[key]);
      await instance.put(`/userprofile/${profileId}`, formData);
      dispatch({
        type: UPDATE_PROFILE,
        payload: {
          updatedProfile: updateProfile,
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
export const fetchProfiles = () => {
  return async (dispatch) => {
    try {
      const res = await instance.get("/profiles");

      dispatch({
        type: FETCH_PROFILE,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
