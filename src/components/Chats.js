import React from 'react'
import SingleChat from './SingleChat'
import Header from './Header'
import OrgHeader from './OrgHeader'
import {connect} from 'react-redux'

const Chats = (props) => {
  let candidate
  if (props.user.userType === 'CANDIDATE') {
    candidate = 'CANDIDATE'
  }
  return (
    <div className='global-screen-box'>
      {candidate ? <Header /> : <OrgHeader />}
       <div className='messages-container'>
      <SingleChat
        name ="Google"
        message ="Hello Archana! Your resume looks.."
        image ="https://blog.hubspot.com/hubfs/image8-2.jpg"
        timestamp ="5 min ago"
      />
      <SingleChat
        name ="Amazon"
        message ="Wonderful! Your interview.."
        image ="https://image.shutterstock.com/image-photo/montreal-canada-february-28-2017-260nw-590095607.jpg"
        timestamp ="30 min ago"
      />
      <SingleChat
        name ="Bloomberg"
        message ="We noticed you applied for.."
        image ="https://media.glassdoor.com/sqll/3096/bloomberg-l-p-squarelogo-1485356219895.png"
        timestamp ="2 days ago"
      />
    </div>
    </div>
  )
}

const mapState = (state) => {
  return {
    user: state.user,
  }
}

export default connect(mapState)(Chats)
