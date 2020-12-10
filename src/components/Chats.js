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
    <div>
      {candidate ? <Header /> : <OrgHeader />}

      <SingleChat
        name="Maria"
        message="Hi there!"
        pic="https://ca.slack-edge.com/T024FPYBQ-U01AZA318E6-46c74a95e013-512"
        when="5 min ago"
      />
      <SingleChat
        name="Archana"
        message="Time to get hired!"
        pic="https://ca.slack-edge.com/T024FPYBQ-U01AJHRCK2T-b11a13f36d63-512"
        when="30 min ago"
      />
      <SingleChat
        name="Mackenzie"
        message="I have seen you applied for.."
        pic="https://ca.slack-edge.com/T024FPYBQ-U017W20F9D4-dd652129cf3c-512"
        when="5 min ago"
      />
    </div>
  )
}

const mapState = (state) => {
  return {
    user: state.user,
  }
}

export default connect(mapState)(Chats)
