import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ChatIcon from '@material-ui/icons/Chat'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Logout from './Logout'
import {connect} from 'react-redux'
import {logout} from '../store'
import PropTypes from 'prop-types'
import '../styles/App.css'

const Header = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const profile = () => {
    props.history.push('/profile')
  }

  return (
    <div className="header">
      <div>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <AccountCircleIcon className="icons" fontSize="large" />
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <Link to="/profile">
            <MenuItem onClick={handleClose}>Profile</MenuItem>
          </Link>
          <MenuItem onClick={handleClose}>Matches</MenuItem>

          <Link to="/">
            <MenuItem href="#" onClick={handleClick}>
              Logout
            </MenuItem>
            {/* Logout */}
          </Link>
        </Menu>
      </div>
      <Link to="/home">
        <LinkedInIcon className="icons" fontSize="large" />
      </Link>
      <Link to="/chat">
        <ChatIcon className="icons" fontSize="large" />
      </Link>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout())
    },
  }
}

export default connect(mapState, mapDispatch)(Header)

/**
 * PROP TYPES
 */
Logout.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
}
