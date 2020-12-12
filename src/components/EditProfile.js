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
        {/* <h3>Edit My Profile</h3> */}
        <div className="profile-edit-candidate">
          <Avatar className="chat_avatar" src={profile.img} />
          <Link to="/profile/editAvatar">
            <h3>Edit Photo</h3>
          </Link>

          <h6>Name</h6>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="name"
              onChange={this.handleChange}
              value={name}
              required
            />
            <h6>Current Company</h6>
            <input
              type="text"
              name="currentCompany"
              onChange={this.handleChange}
              value={currentCompany}
              required
            />
            <h6>Current Role</h6>
            <input
              type="text"
              name="currentRole"
              onChange={this.handleChange}
              value={currentRole}
              required
            />
            <h6>Location</h6>
            <input
              type="text"
              name="location"
              onChange={this.handleChange}
              value={location}
              required
            />
            <h6>Description</h6>
            <input
              type="text"
              name="description"
              onChange={this.handleChange}
              value={description}
              required
            />
            <h6> Would you like to work remote?</h6>
            <FormControl>
              <FormLabel>
                <FormLabel />
                <RadioGroup
                  name="isRemote"
                  onChange={this.handleChange}
                  value={isRemote}
                  row
                >
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
                </RadioGroup>
              </FormLabel>
            </FormControl>
            <Link to={`/profile/editSkills/${this.props.profile.id}`}>
              <button className="edit-org-button-save-changes">
                Edit my skills
              </button>
            </Link>
            <button type="submit">Save Changes</button>
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
