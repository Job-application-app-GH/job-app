import React from 'react'
import {connect} from 'react-redux'
import {postNewOrganization} from '../store/organization'
import {Link} from 'react-router-dom'
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'

// EXTRA COPY

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
    this.props.history.push('/uploadLogo')
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
      <div className="global-screen-box">
        <form onSubmit={this.handleSubmit} id="add-form-organization">
          <div>
            <h3>Company Name</h3>
            <input
              classname="signup-input"
              type="text"
              name="name"
              onChange={this.handleChange}
              value={name}
              required
            />
          </div>
          <div>
            <h3>Location</h3>
            <input
              classname="signup-input"
              type="text"
              name="location"
              onChange={this.handleChange}
              value={location}
              required
            />
          </div>
          <div>
            <h3>Brief Company description</h3>
            <textarea
              className="signup-textbox"
              type="text"
              name="description"
              onChange={this.handleChange}
              value={description}
              required
            />
          </div>
          <div className="remote-yes-no-org">
            <h3> Are you willing to hire remote employees? </h3>
            <FormControl>
              <FormLabel>
                <FormLabel />
                <RadioGroup
                  name="isRemote"
                  onChange={this.handleChange}
                  value={isRemote}
                  required
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
          </div>
          <div>
            <button className="signup-details-button-org" type="submit">
              Submit
            </button>
          </div>
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
