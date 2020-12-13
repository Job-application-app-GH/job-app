import React from 'react'
import {connect} from 'react-redux'
import {fetchUpdatedProfile, fetchUserDetails} from '../store/profile'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import Header from './Header'
import Avatar from '@material-ui/core/Avatar'
import {Link} from 'react-router-dom'

class EditProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.profile.name,
      location: this.props.profile.location,
      description: this.props.profile.description,
      isRemote: this.props.profile.isRemote,
      currentCompany: this.props.profile.currentCompany,
      currentRole: this.props.profile.currentRole,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.loadUserDetails()
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.loadUpdatedProfile({...this.state})
    this.props.history.goBack()
  }
  render() {
    const {
      name,
      location,
      description,
      isRemote,
      currentCompany,
      currentRole,
    } = this.state
    const profile = this.props.profile
    return (
      <div className="global-screen-box">
        <Header />
        <div className="profile-edit-candidate">
          <Link to="/profile/editAvatar">
            <Avatar className="chat_avatar" src={profile.img} />
            <h3 style={{marginTop: '5px', marginBottom: '5px'}}>Edit Photo</h3>
          </Link>
          <form onSubmit={this.handleSubmit}>
            <div className="profile-edit-candidate-details">
              <h3>Name</h3>
              <input
                type="text"
                name="name"
                onChange={this.handleChange}
                value={name}
                required
              />
              <h3>Current Company</h3>
              <input
                type="text"
                name="currentCompany"
                onChange={this.handleChange}
                value={currentCompany}
                required
              />
              <h3>Current Role</h3>
              <input
                type="text"
                name="currentRole"
                onChange={this.handleChange}
                value={currentRole}
                required
              />
              <h3>Location</h3>
              <input
                type="text"
                name="location"
                onChange={this.handleChange}
                value={location}
                required
              />
              <h3>Tell us about yourself</h3>
              <input
                type="text"
                name="description"
                onChange={this.handleChange}
                value={description}
                required
              />
              <h3 style={{marginTop: '20px'}}> Interested in Remote Roles?</h3>
              <FormControl>
                <FormLabel>
                  <FormLabel />
                  <RadioGroup
                    name="isRemote"
                    onChange={this.handleChange}
                    value={isRemote}
                    row
                  >
                    <div className="profile-edit-org-yes-no">
                      <FormControlLabel
                        value="true"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="false"
                        control={<Radio />}
                        label="No"
                      />
                    </div>
                  </RadioGroup>
                </FormLabel>
              </FormControl>
            </div>
            <Link to={`/profile/editSkills/${this.props.profile.id}`}>
              <button className="profile-edit-skill-button">Edit skills</button>
            </Link>
            <div />
            <button className="profile-edit-skill-button" type="submit">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    profile: state.profile,
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadUserDetails: () => dispatch(fetchUserDetails()),
    loadUpdatedProfile: (profile) => dispatch(fetchUpdatedProfile(profile)),
  }
}

export default connect(mapState, mapDispatch)(EditProfile)
