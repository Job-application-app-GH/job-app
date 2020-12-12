import React from 'react'
import {fetchUserDetails} from '../store/profile'
import {fetchCandidateSkills} from '../store/skillsList'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Header from './Header'
import OrgHeader from './OrgHeader'
import Avatar from '@material-ui/core/Avatar'

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      renderForm: false,
    }
    this.displayForm = this.displayForm.bind(this)
  }

  async componentDidMount() {
    await this.props.loadUserDetails()
    if (this.props.user.userType === 'CANDIDATE') {
      await this.props.loadCandidateSkills(this.props.profile.id)
    }
  }

  displayForm() {
    this.setState({
      renderForm: !this.state.renderForm,
    })
  }

  render() {
    const profile = this.props.profile
    const user = this.props.user
    const skills = this.props.skillsList
    let link
    let candidate
    if (user.userType === 'CANDIDATE') {
      candidate = 'CANDIDATE'
    }
    if (user.userType === 'CANDIDATE') {
      link = '/profile/edit'
    } else if (user.userType === 'ORGANIZATION') {
      link = '/profile/editOrg'
    }
    console.log('skills->', skills)
    return (
      <div className="global-screen-box">
        {candidate ? <Header /> : <OrgHeader />}
        <div className="profile-edit-org">
          {candidate ? <h2>User Profile</h2> : <h2>Company Profile</h2>}
          {candidate ? (
            <Link to="/profile/editAvatar">
              <button>Edit Profile Photo</button>
            </Link>
          ) : null}

          <Avatar className="chat_avatar" src={profile.img} />
          <h3>{profile.name}</h3>
          <h3>Location: {profile.location}</h3>
          {profile.currentCompany ? (
            <h3>Current Company: {profile.currentCompany}</h3>
          ) : null}
          {profile.currentRole ? (
            <h3>Current Role: {profile.currentRole}</h3>
          ) : null}
          <h3>Description: {profile.description}</h3>
          <div className="profile-remote">
            {candidate ? (
              <h3 className="profile-remote-question">
                Are you willing to work remote:
                {profile.isRemote ? (
                  <h3 className="profile-remote-question.first-child">Yes</h3>
                ) : (
                  <h3>No</h3>
                )}
              </h3>
            ) : (
              <h3>
                Are you willing to hire remote candidates:
                {profile.isRemote ? <h3>Yes</h3> : <h3>No</h3>}
              </h3>
            )}
          </div>
          {skills
            ? skills.map((skill) => (
                <div key={skill.id}>
                  <p>{skill.name}</p>
                </div>
              ))
            : null}
          <Link to={link}>
            <button
              className="profile-edit-org-button"
              onClick={this.displayForm}
            >
              EDIT
            </button>
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
    skillsList: state.skillsList,
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadUserDetails: () => dispatch(fetchUserDetails()),
    loadCandidateSkills: (id) => dispatch(fetchCandidateSkills(id)),
  }
}

export default connect(mapState, mapDispatch)(Profile)
