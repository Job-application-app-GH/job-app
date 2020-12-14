import React from 'react'
import {fetchJobProfile} from '../store/profile'
import {fetchJobSkills} from '../store/skillsList'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Header from './Header'
import Avatar from '@material-ui/core/Avatar'

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
    const organizationName = ((profile || {}).organization || {}).name
    const organizationImg = ((profile || {}).organization || {}).img
    return (
      <div className="global-screen-box">
        <Header />

        <div className="profile-matches-container">
          <Avatar className="chat_avatar" src={organizationImg} />
          <h2>{organizationName}</h2>
          <div className="view-matches">
            <h3>{profile.title}</h3>
            <h3>Location</h3>
            <h4>{profile.location}</h4>
            {profile.currentCompany ? (
              <h3>Current Company {profile.currentCompany}</h3>
            ) : null}
            {profile.currentRole ? (
              <h3>Current Role: {profile.currentRole}</h3>
            ) : null}
            <h3>Description</h3>
            <h4>{profile.description}</h4>
            {profile.isRemote ? (
              <h4>They are willing to hire remote candidates</h4>
            ) : (
              <h4>They will not hire remote candidates</h4>
            )}
            <h3>Skills</h3>
            {skills
              ? skills.map((skill) => (
                  <div key={skill.id}>
                    <p>{skill.name}</p>
                  </div>
                ))
              : null}
          </div>
          <button className="match-profile-back-button" onClick={this.goBack}>
            Return to all matches
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
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadUserDetails: (id) => dispatch(fetchJobProfile(id)),
    loadJobSkills: (id) => dispatch(fetchJobSkills(id)),
  }
}

export default connect(mapState, mapDispatch)(CandidateMatchJobProfile)
