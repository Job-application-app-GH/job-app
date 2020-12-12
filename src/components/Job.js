import React from 'react'
import {connect} from 'react-redux'
import {postNewJob} from '../store/job'
import {Link} from 'react-router-dom'
import {fetchOrganization} from '../store/organization'
import {fetchSingleJob} from '../store/job'
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'

class Job extends React.Component {
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
    // this.props.getJob(this.props.organization.id)
    this.props.history.push(`/jobSkills/${this.props.job.id}`)
    this.setState({
      title: '',
      location: '',
      description: '',
      isRemote: '',
    })
  }

  render() {
    const {title, location, description, isRemote} = this.state
    const jobId = this.props.job.id
    return (
      <div className="global-screen-box">
        <form id="add-job" onSubmit={this.handleSubmit}>
          <h2>Create a new job posting</h2>
          <div>
            <h3>Job Title</h3>
            <input
              type="text"
              name="title"
              onChange={this.handleChange}
              value={title}
              required
            />
          </div>
          <div>
            <h3>Location</h3>
            <input
              type="text"
              name="location"
              onChange={this.handleChange}
              value={location}
              required
            />
          </div>

          <h3>Job Description</h3>
          <textarea
            className="signup-textbox"
            type="text"
            name="description"
            onChange={this.handleChange}
            value={description}
            required
          />
          <div>
            <h3> Are you willing to hire remote employees?</h3>
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
          </div>
          <button className="signup-details-button-org" type="submit">
            Submit
          </button>
        </form>
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

export default connect(mapState, mapDispatch)(Job)
