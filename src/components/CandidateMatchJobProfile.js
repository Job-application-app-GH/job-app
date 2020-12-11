import React from 'react'
import {fetchJobProfile} from '../store/profile'
import {fetchJobSkills} from '../store/skillsList'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Header from './Header'

class CandidateMatchJobProfile extends React.Component {
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
    this.props.loadJobSkills(this.props.match.params.id)
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
    const user = this.props.user
    const skills = this.props.skillsList
    // const organizationName = profile.organization.name || ''
    const organizationName = ((profile || {}).organization || {}).name
    console.log('org name-->', organizationName)
    console.log('profile-->', profile)
    return (
      <div>
        <Header />
        <h2>{organizationName}</h2>
        <h3>{profile.title}</h3>
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
    loadUserDetails: (id) => dispatch(fetchJobProfile(id)),
    loadJobSkills: (id) => dispatch(fetchJobSkills(id)),
  }
}

export default connect(mapState, mapDispatch)(CandidateMatchJobProfile)
