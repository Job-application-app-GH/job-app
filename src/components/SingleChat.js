import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import {Link} from 'react-router-dom'

function SingleChat({name, message, image, timestamp}) {
  return (
    <Link to={`/messages/chat/${name}`}>
    <div className="chat">
      <Avatar className="chat_avatar" src={image} />
      <div className="chat_det">
        <h2>{name}</h2>
        <p>{message}</p>
      </div>
      <p className="chat_time">{timestamp}</p>
    </div>
    </Link>
  )
}

export default SingleChat
