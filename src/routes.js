import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
// import { Login, SignUp, UserHome } from "./components";
import Login from './components/AuthForm'
import Signup from './components/Signup'
import Logout from './components/Logout'
// import UserHome from './components/UserHome'
import ProfileType from './components/ProfileType'
import SignupOrg from './components/SignupOrg'
import SignupDetails from './components/SignupDetails'
import UploadAvatar from './components/UploadAvatar'
import CandidateMatches from './components/CandidateMatches'
import JobMatches from './components/JobMatches'
import Job from './components/Job'
import Profile from './components/Profile'
import EditProfile from './components/EditProfile'
import EditProfileOrg from './components/EditProfileOrg'
import JobProfile from './components/JobProfile'
import EditJob from './components/EditJob'
import SingleJob from './components/SingleJob'
import AddNewJob from './components/AddNewJob'
import {CandidateSkills, JobSkills} from './components'
import {EditCandidateSkills} from './components/EditSkills'
import {EditJobSkills} from './components/EditSkills'
import LandingPage from './components/LandingPage'
import JobMatchCandidateProfile from './components/JobMatchCandidateProfile'
import {AddNewJobSkills} from './components/AddNewSkills'
import {me} from './store'
import ProfileMatchesJob from './components/ProfileMatchesJob'
import ProfileMatchesCandidate from './components/ProfileMatchesCandidate'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={Login} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signup/type" component={ProfileType} />
        <Route exact path="/signup/candidate" component={SignupDetails} />
        <Route exact path="/signup/organization" component={SignupOrg} />
        <Route exact path="/signup/organization/job" component={Job} />
        <Route exact path="/profileImage" component={UploadAvatar} />
        <Route exact path="/findCandidates" component={CandidateMatches} />
        <Route exact path="/findJobs" component={JobMatches} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/profile/edit" component={EditProfile} />
        <Route exact path="/profile/editOrg" component={EditProfileOrg} />
        <Route exact path="/profile/jobs" component={JobProfile} />
        <Route exact path="/profile/jobs/edit/:id" component={EditJob} />
        <Route exact path="/profile/jobs/:id" component={SingleJob} />
        <Route path="/profile/jobs/matches/:id" component={ProfileMatchesJob} />
        <Route
          exact
          path="/profile/candidate/matches/:id"
          component={ProfileMatchesCandidate}
        />
        <Route path="/candidateSkills/:ownerId" component={CandidateSkills} />
        <Route path="/jobSkills/:ownerId" component={JobSkills} />
        <Route exact path="/profile/addJob" component={AddNewJob} />
        <Route exact path="/home" component={LandingPage} />

        <Route
          exact
          path="/profile/editskills/:id"
          component={EditCandidateSkills}
        />
        <Route
          exact
          path="/profile/jobs/editskills/:id"
          component={EditJobSkills}
        />
        <Route exact path="/matches/:id" component={JobMatchCandidateProfile} />
        <Route
          exact
          path="/profile/addJob/addSkills/:ownerId"
          component={AddNewJobSkills}
        />

        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            {/* <Route path="/signup/type" component={ProfileType} /> */}
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        {/* <Route component={Login} /> */}
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me())
    },
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
}
