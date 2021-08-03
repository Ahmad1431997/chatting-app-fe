import { UPDATE_PROFILE, FETCH_PROFILE } from "../actions/types";

const initialState = {
  profiles: [],
  loading:true
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROFILE:
      return {
        ...state,
        profiles: action.payload,
        loading:false
      };

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
