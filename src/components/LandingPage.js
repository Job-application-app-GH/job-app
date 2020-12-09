import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {
  fetchCandidateProfile,
  fetchJobProfile,
  fetchUserDetails,
} from '../store/profile'
import Header from './Header'
import {fetchOrganization} from '../store/organization'
import {fetchAllJobs} from '../store/job'

class LandingPage extends React.Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    await this.props.loadUserId()
  }

  render() {
    // const id = this.props.profile.id
    // console.log('job--->', this.props.job)

    const jobs = this.props.job
    return (
      <div>
        <Header />
        <h2>This is the landing page!</h2>
        {jobs.length ? (
          <h3>Click on a job to start searching for candidates</h3>
        ) : null}
        {jobs.length
          ? jobs.map((job) => (
              <Link to="/findJobs">
                <div>
                  <h5>{job.title}</h5>
                  <h5>{job.location}</h5>
                  <h5>temp spacing----</h5>
                </div>
              </Link>
            ))
          : null}

        <button>Get Started</button>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    user: state.user,
    profile: state.profile,
    job: state.job,
    organization: state.organization,
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadUserId: (id) => dispatch(fetchUserDetails(id)),
  }
}

export default connect(mapState, mapDispatch)(LandingPage)
