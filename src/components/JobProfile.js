import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchAllJobs} from '../store/job'
import {fetchUserDetails} from '../store/profile'

class JobProfile extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.loadUserDetails()
    // this.props.fetchJobs(this.props.profile.id)
  }

  render() {
    const jobs = this.props.profile.jobs || []
    console.log('profile', this.props.profile.id)
    console.log(jobs)
    return (
      <div>
        <h3>Job Postings</h3>
        <Link to="/profile">
          <button>Back to profile</button>
        </Link>
        <Link to="/addJob">
          <button>Add New Job</button>
        </Link>
        {jobs.map((job) => (
          <div key={job.id} className="job-listing">
            <h5>---</h5>
            <Link to={`/profile/jobs/${job.id}`}>
              <h5> {job.title}</h5>
              <h5> {job.location}</h5>
              <h5> {job.description}</h5>
            </Link>
            <h5>---</h5>
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
    job: state.job,
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadUserDetails: () => dispatch(fetchUserDetails()),

    fetchJobs: (orgId) => dispatch(orgId),
  }
}

export default connect(mapState, mapDispatch)(JobProfile)
