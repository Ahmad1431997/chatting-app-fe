import { UPDATE_PROFILE } from "../actions/types";

const initialState = {
  // profiles: [],
  profiles: [
    { userId: 19, gendar: "male", status: "I'm too busy", image: "" },
    { userId: 17, gendar: "male", status: "enjoying my work", image: "" },
    { userId: 18, gendar: "male", status: "so sleepy", image: "" },
  ],
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PROFILE:
      const { updatedProfile } = action.payload;
      return {
        ...state,
        profiles: state.profiles.map((profile) =>
          profile.id === updatedProfile.id ? updatedProfile : profile
        ),
      };
    default:
      return state;
  }
};

export default profileReducer;
