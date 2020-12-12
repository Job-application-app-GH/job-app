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
    //ARCHANA: Check with Mackenzie for candidateId access
    const candidateId = this.props.profile.id
    return (
      <div className='global-screen-box'>
        <Header />
        <div className='landing-page'>
        <h2>This is the landing page!</h2>
        <Link to={`/findJobs/${candidateId}`}>
          <button>Get Started</button>
        </Link>
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
    loadUserId: (id) => dispatch(fetchUserDetails(id)),
  }
}

export default connect(mapState, mapDispatch)(LandingPage)
