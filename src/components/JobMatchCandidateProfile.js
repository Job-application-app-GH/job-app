import React from 'react'
import {fetchCandidateProfile} from '../store/profile'
import {fetchCandidateSkills} from '../store/skillsList'
import {fetchJobMatches} from '../store/profileMatches'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Header from './Header'
import OrgHeader from './OrgHeader'

class JobMatchCandidateProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      renderForm: false,
    }
    this.displayForm = this.displayForm.bind(this)
    this.goBack = this.goBack.bind(this)
  }

  componentDidMount() {
    this.props.loadUserDetails(this.props.match.params.id)
    this.props.loadCandidateSkills(this.props.match.params.id)
  }

  displayForm() {
    this.setState({
      renderForm: !this.state.renderForm,
    })
  }

  goBack() {
    this.props.history.goBack()
  }

  render() {
    const profile = this.props.profile || {}
    // const candidateEmail = profile.user.email || ''
    const candidateEmail = ((profile || {}).user || {}).email
    const skills = this.props.skillsList
    console.log('props', this.props)
    console.log('email->', candidateEmail)
    return (
      <div className="global-screen-box">
        <OrgHeader />
        <div className="profile-matches-container">
          {candidateEmail ? (
            <button className="match-profile-back-button">
              <a href={'mailto:' + candidateEmail}>Want to reach out?</a>
            </button>
          ) : null}
          <div className="view-profile">
            <h2>{profile.name}</h2>
            <div className="view-matches">
              <h3>Location</h3>
              <h4>{profile.location}</h4>

              <h3>Current Role</h3>
              <h4>
                {profile.currentCompany} @ {profile.currentRole}
              </h4>
              {/* {profile.currentRole ? (
            <h3>Current Role: {profile.currentRole}</h3>
          ) : null} */}
              <h3>Bio</h3>
              <h4>{profile.description}</h4>
              {profile.isRemote ? (
                <h3>Is willing to work remote</h3>
              ) : (
                <h3>Is not willing to work remote</h3>
              )}
              <h3>Skills</h3>
              {skills
                ? // <h5>Skills:</h5>
                  skills.map((skill) => (
                    <div key={skill.id}>
                      <p>{skill.name}</p>
                    </div>
                  ))
                : null}
            </div>
          </div>
          <button
            style={{backgroundColor: 'none'}}
            className="match-profile-back-button"
            onClick={this.goBack}
          >
            Back
          </button>
        </div>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    profile: state.profile,
    user: state.user,
    skillsList: state.skillsList,
    job: state.job,
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadUserDetails: (id) => dispatch(fetchCandidateProfile(id)),
    loadCandidateSkills: (id) => dispatch(fetchCandidateSkills(id)),
  }
}

export default connect(mapState, mapDispatch)(JobMatchCandidateProfile)
