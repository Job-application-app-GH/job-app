import React from 'react'
import {connect} from 'react-redux'
import {postNewCandidate, fetchCandidate} from '../store/candidate'
import {fetchUserDetails} from '../store/profile'
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from '@material-ui/core'
import {Link} from 'react-router-dom'

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

  //ISSUE?!?!?!
  async handleSubmit(event) {
    event.preventDefault()
    await this.props.newCandidate({...this.state})
    // await this.props.fetchCandidate()
    console.log('id-->', this.props.candidate.id)
    this.props.history.push(`/candidateSkills/${this.props.candidate.id}`)
    console.log('State in handle submit', this.state)
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
    const candidateId = this.props.candidate.id
    console.log(candidateId)
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
          <h5>Tell us about yourself </h5>
          <textarea
            type="text"
            name="description"
            onChange={this.handleChange}
            value={description}
          />
          {/* <Link to="/profileImage">
            <button type="submit" onClick={this.handleSubmit}>
              Submit
            </button>
          </Link> */}
          {/* <Link to={`/candidateSkills/${candidateId}`}> */}
          <button type="submit" onClick={this.handleSubmit}>
            Save
          </button>
          {/* </Link> */}
        </form>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    candidate: state.candidate,
  }
}

const mapDispatch = (dispatch) => {
  return {
    newCandidate: (candidate) => dispatch(postNewCandidate(candidate)),
    fetchCandidate: () => dispatch(fetchCandidate()),
  }
}

export default connect(mapState, mapDispatch)(SignUpDetails)
