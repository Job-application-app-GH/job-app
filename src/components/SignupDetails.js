import React from 'react'
import {connect} from 'react-redux'
import {postNewCandidate, fetchCandidate} from '../store/candidate'

import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import TextField from '@material-ui/core/TextField'

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
    // this.props.history.push(`/candidateSkills/${this.props.candidate.id}`)
    this.props.history.push('/profileImage')
  }

  render() {
    const {
      name,
      location,
      currentCompany,
      currentRole,
      description,
      isRemote,
    } = this.state
    const candidateId = this.props.candidate.id

    return (
      <div className="signup-candidate-form">
        <form onSubmit={this.handleSubmit} id="add-form" autoComplete="off">
          
          <div className='signup-input'>
          <h3>Full Name</h3>
          <input
            required
            type="text"
            name="name"
            onChange={this.handleChange}
            value={name}
          />
          </div>
          <div className='signup-input'>
            <h3>Location</h3>
            <input classname='signup-input'
              className="form-control"
              type="text"
              name="location"
              onChange={this.handleChange}
              value={location}
              required="required"
            />
          </div>
          <div className='signup-input'>
          <h3>Current Company</h3>
          <input classname='signup-input'
            type="text"
            name="currentCompany"
            onChange={this.handleChange}
            value={currentCompany}
            required
          />
          </div>
          <div className='signup-input'>
          <h3>Current Role</h3>
          <input classname='signup-input'
            type="text"
            name="currentRole"
            onChange={this.handleChange}
            value={currentRole}
            required
          />
          </div>

          <FormControl>
            <FormLabel>
              Are you willing to work remote?
              <FormLabel />
              <RadioGroup
                name="isRemote"
                onChange={this.handleChange}
                value={isRemote}
                row
                required
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

          <h3>Tell us about yourself </h3>
          <textarea
            className="signup-textbox"
            type="text"
            name="description"
            onChange={this.handleChange}
            value={description}
            required
          />

          <button className="signup-details-button" type="submit">
            Save
          </button>
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
