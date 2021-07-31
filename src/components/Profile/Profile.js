import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
    const user = useSelector(state => state.user.user)
    const profiles  = useSelector(state => state.profiles.profiles)
    const profile= profiles.find((profile)=>profile.userId == user.id)
    console.log(profile)
    
    return (
        <div className="profile-cont">
        <h2>{user.username}</h2>
        <h3>{profile.gendar?profile.gendar:""}</h3>
        <h4>{profile.status?profile.status:""}</h4>
        
        </div>
    )
}

export default Profile
