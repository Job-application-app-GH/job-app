import React from 'react'
import {connect} from 'react-redux'
import {postNewCandidate, fetchCandidate} from '../store/candidate'

import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
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
        <FormControl id="add-form">
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

          <FormControl>
            <FormLabel>
              Are you willing to work remote?
              <FormLabel />
              <RadioGroup
                name="isRemote"
                onChange={this.handleChange}
                value={isRemote}
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

          <button type="submit" onClick={this.handleSubmit}>
            Save
          </button>
        </FormControl>
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
