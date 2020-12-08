import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {
  fetchCandidateProfile,
  fetchJobProfile,
  fetchUserDetails,
} from '../store/profile'
import {fetchOrganization} from '../store/organization'
import {fetchAllJobs} from '../store/job'

class LandingPage extends React.Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    // await this.props.loadUserId()
    await this.props.loadOrganization()
    await this.props.loadJobs(this.props.organization.id)
  }

  render() {
    // const id = this.props.profile.id
    // console.log('job--->', this.props.job)
    let link
    if (this.props.user.userType === 'CANDIDATE') {
      link = '/findJobs'
      // '/findJobs/${this.props.profile.id}'
    } else {
      link = '/findCandidates'
      //'/findCandidates/${this.props.job.id}'
    }
    const jobs = this.props.job
    return (
      <div>
        <h2>This is the landing page!</h2>
        {jobs.length ? (
          <h3>Click on a job to start searching for candidates</h3>
        ) : null}
        {jobs.length
          ? jobs.map((job) => (
              <Link to={link}>
                <div>
                  <h5>{job.title}</h5>
                  <h5>{job.location}</h5>
                  <h5>temp spacing----</h5>
                </div>
              </Link>
            ))
          : null}
        {!jobs.length ? (
          <Link to={link}>
            <button>Get Started</button>
          </Link>
        ) : null}
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
    // loadUserId: (id) => dispatch(fetchUserDetails(id)),
    loadOrganization: () => dispatch(fetchOrganization()),
    loadJobs: (orgId) => dispatch(fetchAllJobs(orgId)),
  }
}

export default connect(mapState, mapDispatch)(LandingPage)
