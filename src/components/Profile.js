import React from 'react'
import {fetchUserDetails} from '../store/profile'
import {connect} from 'react-redux'

class Profile extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.loadUserDetails()
  }

  render() {
    return (
      <div>
        <h4>User Profile</h4>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    candidate: state.candidate,
    organization: state.organization,
    job: state.job,
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadUserDetails: () => dispatch(fetchUserDetails()),
  }
}

export default connect(mapState, mapDispatch)(Profile)
