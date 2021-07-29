
import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { signout } from '../../store/actions/authActions'
import ChatList from '../Chat/ChatList'
import GroupList from '../Group/GroupList'

function MainPage() {
    const dispatch = useDispatch()
    const history = useHistory()
    
    return (
        <div>
        
                    <ChatList/>
                    <GroupList/>

            {/* <button onClick={() => { dispatch(signout(history)) }} >Logout</button> */}
            {/* put it in the user profile */}
        </div>


    )
}

export default MainPage
