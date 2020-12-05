import React from 'react'
import {connect} from 'react-redux'
import {fetchUpdatedProfile, fetchUserDetails} from '../store/profile'

class EditJob extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
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
    console.log(this.props, 'PROPS IN EDIT PROFILE')
    const {location, description, isRemote} = this.state
    return (
      <div>
        <h3>Edit My Profile</h3>
        <h4>{this.props.profile.name}</h4>
        <input
          type="text"
          name="location"
          onChange={this.handleChange}
          value={location}
        />
        <h6>Description</h6>
        <input
          type="text"
          name="description"
          onChange={this.handleChange}
          value={description}
        />
        <h6>Do you hire remote employees?</h6>
        <input
          type="radio"
          name="isRemote"
          checked={isRemote === true}
          onChange={this.handleChange}
          value="true"
        />
        Yes
        <input
          type="radio"
          name="isRemote"
          checked={isRemote === false}
          onChange={this.handleChange}
          value="false"
        />
        No
        <button type="submit" onClick={this.handleSubmit}>
          Save Changes
        </button>
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

export default connect(mapState, mapDispatch)(EditJob)
