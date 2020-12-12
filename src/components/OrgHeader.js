import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ChatIcon from '@material-ui/icons/Chat'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import {connect} from 'react-redux'
import {logout} from '../store'
import PropTypes from 'prop-types'
import {fetchCandidateMatches} from '../store/profileMatches'
import '../styles/App.css'
import {fetchAllJobs} from '../store/job'
import MenuIcon from '@material-ui/icons/Menu'
import SmsIcon from '@material-ui/icons/Sms'
import logo from '../styles/header-logo.png'
import logoFull from '../styles/seekrsm.png'

const OrgHeader = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const click = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const profile = () => {
    props.history.push('/profile')
  }
  const {handleClick} = props
  return (
    <div className="header">
      <div>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={click}
        >
          <MenuIcon
            className="icons"
            style={{color: 'white'}}
            fontSize="large"
          />
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

          <Link to="/profile/jobs">
            <MenuItem>Job Listings</MenuItem>
          </Link>

          <Link to="/">
            <MenuItem href="#" onClick={handleClick}>
              Logout
            </MenuItem>
            {/* Logout */}
          </Link>
        </Menu>
      </div>
      <Link to="/organization">
        <img
          className="header-img-icon"
          style={{color: 'white'}}
          fontSize="large"
          src ={logoFull}
          alt=''
        />
      </Link>
      <Link to="/messages">
        <SmsIcon className="icons" style={{color: 'white'}} fontSize="large" />
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
    profile: state.profile,
    job: state.job,
    user: state.user,
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick: () => dispatch(logout()),
    loadCandidateSkills: (id) => dispatch(fetchCandidateMatches(id)),
    loadJobs: (orgId) => dispatch(fetchAllJobs(orgId)),
  }
}

export default connect(mapState, mapDispatch)(OrgHeader)

/**
 * PROP TYPES
 */
OrgHeader.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
}
