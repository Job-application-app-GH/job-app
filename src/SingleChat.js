import React from 'react'
import Avatar from '@material-ui/core/Avatar'

function SingleChat({name, message,pic,when}) {
    return <div className='chat'>
        <Avatar className='chat_avatar' src={pic}/>
        <div className='chat_det'>
            <h2>{name}</h2>
            <p>{message}</p>
        </div>
        <p className='chat_time'>{when}</p>
    </div>
}

export default SingleChat
