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

const Header = (props) => {
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

  const candidate = props.profile
  // let matchesLink
  // if (props.user.userType === 'CANDIDATE') {
  //   matchesLink = `/profile/candidate/matches/${candidate.id}`
  // } else {
  //   // matchesLink = `/profile/job/matches/${this.props.job.id}`
  // }

  const {handleClick} = props
  return (
    <div className="header">
      <div>
        <Button
          color= 'white'
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={click}
        >
          <MenuIcon className="icons"  style={{color: 'white'}} fontSize="large" />
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
          <Link to={`/profile/candidate/matches/${candidate.id}`}>
            <MenuItem>Matches</MenuItem>
          </Link>

          <Link to="/">
            <MenuItem href="#" onClick={handleClick}>
              Logout
            </MenuItem>
          </Link>
        </Menu>
      </div>
      <Link to={`/findJobs/${candidate.id}`}>
        <LinkedInIcon className="icons" fontSize="large" />
      </Link>
      <Link to="/messages">
        <SmsIcon className="icons" fontSize="large" />
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

export default connect(mapState, mapDispatch)(Header)

/**
 * PROP TYPES
 */
Header.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
}
