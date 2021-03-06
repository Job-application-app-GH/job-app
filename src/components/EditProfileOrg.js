import React from 'react'
import {connect} from 'react-redux'
import {fetchUpdatedProfile, fetchUserDetails} from '../store/profile'
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import OrgHeader from './OrgHeader'
import {Link} from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'

class EditProfileOrg extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.profile.name,
      location: this.props.profile.location,
      description: this.props.profile.description,
      isRemote: this.props.profile.isRemote,
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
    const profile = this.props.profile
    const {name, location, description, isRemote} = this.state
    return (
      <div className="global-screen-box">
        <OrgHeader />
        <div className="profile-edit-candidate">
          {/* <h2>Edit Profile</h2> */}
          <Link to="/profile/editAvatar">
            <Avatar className="chat_avatar" src={profile.img} />
            <h3>Edit Logo</h3>
          </Link>
          {/* <h3>{this.props.profile.name}</h3> */}
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
              <h3>Location</h3>
              <input
                type="text"
                name="location"
                onChange={this.handleChange}
                value={location}
                required
              />
              <h3>Description</h3>
              <input
                type="text"
                name="description"
                onChange={this.handleChange}
                value={description}
                required
              />
              {/* <textarea
                className="signup-textbox"
                style={{width: '295px'}}
                type="text"
                name="description"
                onChange={this.handleChange}
                value={description}
                required
              /> */}
              <h3 style={{marginTop: '20px'}}>
                Are you willing to hire remote employees?
              </h3>
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

            <button className="edit-org-button-save-changes" type="submit">
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

export default connect(mapState, mapDispatch)(EditProfileOrg)
