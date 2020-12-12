import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {
  fetchCandidateProfile,
  fetchJobProfile,
  fetchUserDetails,
} from '../store/profile'
import OrgHeader from './OrgHeader'
import {fetchOrganization} from '../store/organization'
import {fetchAllJobs} from '../store/job'

class OrgLandingPage extends React.Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    // await this.props.loadUserId()
    await this.props.loadOrganization()
    await this.props.loadJobs(this.props.organization.id)
  }

  render() {
    const jobs = this.props.job || []
    return (
      <div className='global-screen-box'>
        <OrgHeader />
        <div className='landing-page'>
        <h1 style={{color: 'white'}}>Welcome back!</h1>

        <h3>Select a job to start searching for candidates:</h3>

        {jobs.length
          ? jobs.map((job) => {
              //ARCHANA: Check with Mackenzie for jobId access
              const linkForCandidateSearch = `/findCandidates/${job.id}`
              return (
                <Link to={linkForCandidateSearch}>
                  <div  key={job.id}>
                    <div className="landing-page-card">
                    <h3>{job.title}</h3>
                    <h4>{job.location}</h4>
                  </div>
                  </div>
                </Link>
              )
            })
          : null}
          </div>
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

export default connect(mapState, mapDispatch)(OrgLandingPage)
