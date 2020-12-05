import React from 'react'
import {fetchUserDetails} from '../store/profile'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      renderForm: false,
    }
    this.displayForm = this.displayForm.bind(this)
  }

  componentDidMount() {
    this.props.loadUserDetails()
  }

  displayForm() {
    this.setState({
      renderForm: !this.state.renderForm,
    })
  }

  render() {
    const profile = this.props.profile
    console.log('PROFILE-->', profile)
    return (
      <div>
        <h4>User Profile</h4>
        <Link to="profile/edit">
          <button onClick={this.displayForm}>Edit my profile</button>
        </Link>
        <h6>{profile.name}</h6>
        <h6>Location: {profile.location}</h6>
        <p>Description: {profile.description}</p>
        <h6>Remote status: {profile.isRemote}</h6>

        {profile.jobs ? (
          <Link to="/profile/jobs">
            <button>View Job Postings</button>
          </Link>
        ) : null}
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    profile: state.profile,
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadUserDetails: () => dispatch(fetchUserDetails()),
  }
}

export default connect(mapState, mapDispatch)(Profile)
