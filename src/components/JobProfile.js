import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchUserDetails} from '../store/profile'

class JobProfile extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.loadUserDetails()
  }

  render() {
    const jobs = this.props.profile.jobs || []
    console.log(jobs)
    return (
      <div>
        <h3>Job Postings</h3>
        <Link to="/profile">
          <button>Back to profile</button>
        </Link>

        {jobs.map((job) => (
          <div key={job.id} className="job-listing">
            <Link to={`/profile/jobs/${job.id}`}>
              <h5> {job.title}</h5>
              <h5> {job.location}</h5>
              <h5> {job.description}</h5>
              <h5> {job.isRemote}</h5>
            </Link>
          </div>
        ))}
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    profile: state.profile,
    user: state.user,
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadUserDetails: () => dispatch(fetchUserDetails()),
  }
}

export default connect(mapState, mapDispatch)(JobProfile)
