import React from 'react'
import {fetchCandidateProfile} from '../store/profile'
import {fetchCandidateSkills} from '../store/skillsList'
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
    const profile = this.props.profile
    // const candidateEmail = profile.user.email || ''
    const candidateEmail = ((profile || {}).user || {}).email
    const skills = this.props.skillsList
    console.log('email->', candidateEmail)
    return (
      <div>
        <OrgHeader />
        <h3>Want to reach out? </h3>
        {candidateEmail ? (
          <button>
            <a href={'mailto:' + candidateEmail}>
              Send {profile.name} an email
            </a>
          </button>
        ) : null}

        <h2>{profile.name}</h2>

        <h6>Location: {profile.location}</h6>
        {profile.currentCompany ? (
          <h6>Current Company: {profile.currentCompany}</h6>
        ) : null}
        {profile.currentRole ? (
          <h6>Current Role: {profile.currentRole}</h6>
        ) : null}
        <p>Description: {profile.description}</p>
        {profile.isRemote ? (
          <h6>Willing to hire remote candidates: True</h6>
        ) : (
          <h6>Willing to hire remote candidates: False</h6>
        )}
        <h5>Skills</h5>
        {skills
          ? // <h5>Skills:</h5>
            skills.map((skill) => (
              <div key={skill.id}>
                <p>{skill.name}</p>
              </div>
            ))
          : null}

        <button onClick={this.goBack}>Return to all matches</button>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    profile: state.profile,
    user: state.user,
    skillsList: state.skillsList,
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadUserDetails: (id) => dispatch(fetchCandidateProfile(id)),
    loadCandidateSkills: (id) => dispatch(fetchCandidateSkills(id)),
  }
}

export default connect(mapState, mapDispatch)(JobMatchCandidateProfile)
