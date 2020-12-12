import React from 'react'
import {connect} from 'react-redux'
import job, {postNewJob} from '../store/job'
import {fetchSingleJob} from '../store/job'

import {fetchOrganization} from '../store/organization'
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import {Link} from 'react-router-dom'
import OrgHeader from './OrgHeader'

class AddNewJob extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      location: '',
      isRemote: true,
      description: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.loadOrganization(this.props.organization.id)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  async handleSubmit(event) {
    event.preventDefault()
    await this.props.newCandidate({...this.state}, this.props.organization.id)
    await this.props.history.push(`/profile/addSkills/${this.props.job.id}`)
    this.setState({
      title: '',
      location: '',
      description: '',
      isRemote: true,
    })
  }

  render() {
    const {title, location, description, isRemote} = this.state
    return (
      <div className="global-screen-box">
        <div className="add-new-job">
          <OrgHeader />
          <form onSubmit={this.handleSubmit} id="add-form">
            <h3>Job Title</h3>
            <input
              type="text"
              name="title"
              onChange={this.handleChange}
              value={title}
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
            <h3>Job Description</h3>
            <textarea
              className="signup-textbox"
              type="text"
              name="description"
              onChange={this.handleChange}
              value={description}
              required
            />
            <h3> Are you willing to hire remote candidates?</h3>
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
            <div>
              <button className="signup-details-button" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    organization: state.organization,
    job: state.job,
  }
}

const mapDispatch = (dispatch) => {
  return {
    newCandidate: (job, id) => dispatch(postNewJob(job, id)),
    loadOrganization: (id) => dispatch(fetchOrganization(id)),
    getJob: (orgId) => dispatch(fetchSingleJob(orgId)),
  }
}

export default connect(mapState, mapDispatch)(AddNewJob)
