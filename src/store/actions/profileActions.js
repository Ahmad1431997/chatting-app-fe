import instance from "./instance";
import { UPDATE_PROFILE } from "./types";


export const updateProfile = (updatedProfile) => {
    return async(dispatch)=>{
    try {
        const formData= new FormData();
        for(const key in updatedProfile)
           formData.append(key,updatedProfile[key])
        await instance.put(`/products/${updatedProfile.id}`,formData)
        dispatch({
            type: UPDATE_PROFILE,
            payload: {
                updatedProfile:updateProfile,
            }
        })
    } catch (error) {
        console.log(error.message)
    }

}}