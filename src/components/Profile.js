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
      link = '/profile/edit'
    } else if (user.userType === 'ORGANIZATION') {
      link = '/profile/editOrg'
    }

    return (
      <div className="global-screen-box">
        {candidate ? <Header /> : <OrgHeader />}
        <div className="profile-edit-org">
          {/* {candidate ? <h2>User Profile</h2> : <h2>Company Profile</h2>} */}
          {/* {candidate ? (
            <Link to="/profile/editAvatar">
              <button>Edit Profile Photo</button>
            </Link>
          ) : null} */}
          <Avatar className="chat_avatar" src={profile.img} />
          <h3>{profile.name}</h3>
          <div className="view_profile">
            <h3>Location</h3> <h4>{profile.location}</h4>
            {profile.currentRole ? (
              <div className="view_profile_candidate">
                <h3>Current Role</h3>
                <h4>
                  {' '}
                  {profile.currentRole} @ {profile.currentCompany}
                </h4>
              </div>
            ) : null}
            {/* {profile.currentCompany ? (
              <h3>@ {profile.currentCompany}</h3>
            ) : null} */}
            <h3>About</h3>
            <h4> {profile.description}</h4>
            {candidate ? (
              profile.isRemote ? (
                <h4>I am willing to work remotely</h4>
              ) : null
            ) : profile.isRemote ? (
              <h4>We are willing to hire remote candidates</h4>
            ) : null}
            {skills && candidate ? (
              <div className="view_profile_candidate">
                <h3> Skills</h3>
                {skills.map((skill) => (
                  <div key={skill.id}>
                    <p>{skill.name}</p>
                  </div>
                ))}
              </div>
            ) : null}
            {/* {skills && candidate ? (
              <div className="view_profile_candidate">
                <h3> Skills</h3>
                <div> {convertSkillsToString(skills)}</div>
              </div>
            ) : null} */}
          </div>
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
