import React from 'react'
import {connect} from 'react-redux'
import {postNewCandidate} from '../store/candidate'
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from '@material-ui/core'

class SignUpDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      location: '',
      currentCompany: '',
      currentRole: '',
      description: '',
      isRemote: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.newCandidate({...this.state})
    this.setState({
      name: '',
      location: '',
      currentCompany: '',
      currentRole: '',
      description: '',
      // img: '',
      isRemote: '',
    })
  }

  render() {
    const {
      name,
      location,
      currentCompany,
      currentRole,
      description,
      isRemote,
      photoUrl,
    } = this.state
    return (
      <div>
        <form id="add-form">
          <h5>Full Name</h5>
          <input
            type="text"
            name="name"
            onChange={this.handleChange}
            value={name}
          />
          <h5>Location</h5>
          <input
            type="text"
            name="location"
            onChange={this.handleChange}
            value={location}
          />
          <h5>Current Company</h5>
          <input
            type="text"
            name="currentCompany"
            onChange={this.handleChange}
            value={currentCompany}
          />
          <h5>Current Role</h5>
          <input
            type="text"
            name="currentRole"
            onChange={this.handleChange}
            value={currentRole}
          />
          <h5>Are you willing to work remote?</h5>
          {/* <FormControl>
            <FormLabel>
              <RadioGroup
                name="isRemote"
                value="true"
                onChange={this.handleChange}
                checked={this.state.isRemote === true}
              />
              <FormControlLabel value="true" control={<Radio />} label="Yes" />
              <RadioGroup
                name="isRemote"
                value="false"
                onChange={this.handleChange}
              />
              <FormControlLabel value="false" control={<Radio />} label="No" />
            </FormLabel>
          </FormControl> */}
          <label for="true">
            <input
              type="radio"
              name="isRemote"
              checked={isRemote === true}
              onChange={this.handleChange}
              value="true"
            />
          </label>
          Yes
          <input
            type="radio"
            name="isRemote"
            checked={isRemote === false}
            onChange={this.handleChange}
            value="false"
          />
          No
          <h5>Tell us about yourself </h5>
          <textarea
            type="text"
            name="description"
            onChange={this.handleChange}
            value={description}
          />
          <h5>Upload a profile photo</h5>
          <input
            type="file"
            name="img"
            value={photoUrl}
            onChange={this.handleFile}
          />
          <button type="submit" onClick={this.handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    )
  }
}

const mapDispatch = (dispatch) => {
  return {
    newCandidate: (candidate) => dispatch(postNewCandidate(candidate)),
  }
}

export default connect(null, mapDispatch)(SignUpDetails)
