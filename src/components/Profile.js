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
    await this.props.loadCandidateSkills(this.props.profile.id)
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
    return (
      <div>
        {candidate ? <Header /> : <OrgHeader />}
        {candidate ? <h4>User Profile</h4> : <h4>Company Profile</h4>}

        <Link to={link}>
          <button onClick={this.displayForm}>Edit my profile</button>
        </Link>
        <Avatar className="chat_avatar" src={profile.img} />
        <h6>{profile.name}</h6>
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
          ? // <div>
            // <h5>Skills:</h5>
            // </div>
            skills.map((skill) => (
              <div key={skill.id}>
                <p>{skill.name}</p>
              </div>
            ))
          : null}
        {candidate ? (
          <Link to={`/profile/candidate/matches/${profile.id}`}>
            <button>View matches</button>
          </Link>
        ) : null}

        {profile.jobs ? (
          <Link to="/profile/jobs">
            <button>View Job Postings</button>
          </Link>
        ) : null}
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
