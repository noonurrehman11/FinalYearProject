import React from 'react'
import Chat from '../../components/Chat/Chat'
import Sidebar from '../../components/Sidebar/Sidebar'

const Chats = () => {
    return (
        <div style={{display:'flex'}}>
            <Sidebar/>
            <Chat/>
        </div>
    )
}

export default Chats
