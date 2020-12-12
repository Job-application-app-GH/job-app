import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchAllJobs} from '../store/job'
import {fetchUserDetails} from '../store/profile'
import OrgHeader from './OrgHeader'

class JobProfile extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.loadUserDetails()
  }

  sort_by_key(array, key) {
    return array.sort(function (a, b) {
      var x = a[key]
      var y = b[key]
      return x < y ? -1 : x > y ? 1 : 0
    })
  }

  render() {
    const allJobs = this.props.profile.jobs || []
    const jobs = this.sort_by_key(allJobs, 'id')

    return (
      <div className="global-screen-box">
        <div className="job-profile-listing">
          <OrgHeader />

          <Link to="/profile/addJob">
            <button className="add-new-job-button">Add New Job</button>
          </Link>
          {jobs.map((job) => (
            <div key={job.id} className="job-listing">
              <Link to={`/profile/jobs/${job.id}`}>
                <button className="job-listing-button">
                  <h4> {job.title}</h4>
                  <h4> {job.location}</h4>
                  {/* <h5> {job.description}</h5> */}
                </button>
              </Link>
            </div>
          ))}
          <Link to="/profile">
            <h3>Back to profile</h3>
          </Link>
        </div>
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
