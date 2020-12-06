import React from 'react'
import {connect} from 'react-redux'
import {postNewOrganization} from '../store/organization'
import {Link} from 'react-router-dom'
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'

class SignUpOrgDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      location: '',
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
    this.props.newOrganization({...this.state})
    this.setState({
      name: '',
      location: '',
      description: '',
      isRemote: '',
    })
  }

  render() {
    const {name, location, description, isRemote} = this.state
    return (
      <div>
        <form id="add-form">
          <h5>Company Name</h5>
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
          <h5>Give a brief description of the company </h5>
          <textarea
            type="text"
            name="description"
            onChange={this.handleChange}
            value={description}
          />
          <FormControl>
            <FormLabel>
              Are you willing to hire remote employees?
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

          <Link to="/name">
            <button type="submit" onClick={this.handleSubmit}>
              Submit
            </button>
          </Link>
        </form>
      </div>
    )
  }
}

const mapDispatch = (dispatch) => {
  return {
    newOrganization: (organization) =>
      dispatch(postNewOrganization(organization)),
  }
}

export default connect(null, mapDispatch)(SignUpOrgDetails)
