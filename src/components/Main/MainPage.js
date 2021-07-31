
import React from 'react'
import { useDispatch } from 'react-redux'
import { Route, Switch, useHistory } from 'react-router'
import { signout } from '../../store/actions/authActions'
import ChatList from '../Chat/ChatList'
import GroupList from '../Group/GroupList'
import Profile from '../Profile/Profile'
import Room from '../Room/Room'

function MainPage() {
    const dispatch = useDispatch()
    const history = useHistory()
    
    return (
        <div>
                    <Profile/>
                    <ChatList/> 
                    <GroupList/>
                   
                    {/* <Room/> */}
                   

            {/* <button onClick={() => { dispatch(signout(history)) }} >Logout</button> */}
            {/* put it in the user profile */}
        </div>


    )
}

export default MainPage
