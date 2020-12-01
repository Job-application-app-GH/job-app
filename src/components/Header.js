import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ChatIcon from '@material-ui/icons/Chat'

import '../styles/App.css'

export default class Header extends Component {
  render() {
    return (
      <div className="header">
        <Link to="/skills">
          <AccountCircleIcon className="icons" fontSize="large" />
        </Link>
        <Link to="/">
          <LinkedInIcon className="icons" fontSize="large" />
        </Link>
        <Link to="/chat">
          <ChatIcon className="icons" fontSize="large" />
        </Link>
      </div>
    )
  }
}
