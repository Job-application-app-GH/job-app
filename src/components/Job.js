import React from 'react'
import {connect} from 'react-redux'
import {postNewJob} from '../store/job'
import {Link} from 'react-router-dom'
import {fetchOrganization} from '../store/organization'
import {fetchSingleJob} from '../store/job'

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

  handleSubmit(event) {
    event.preventDefault()
    console.log('props in handle submit', this.props.organizationId)
    this.props.newCandidate({...this.state}, this.props.organization.id)
    this.props.getJob(this.props.organization.id)
    this.setState({
      title: '',
      location: '',
      description: '',
      isRemote: '',
    })
  }

  render() {
    // console.log('PROPS', this.props.organization.id)
    const {title, location, description, isRemote} = this.state
    const jobId = this.props.job.id
    console.log('job id', jobId)
    return (
      <div>
        <form id="add-form">
          <h5>Job Title</h5>
          <input
            type="text"
            name="title"
            onChange={this.handleChange}
            value={title}
          />
          <h5>Location</h5>
          <input
            type="text"
            name="location"
            onChange={this.handleChange}
            value={location}
          />
          <h5>Job Description</h5>
          <textarea
            type="text"
            name="description"
            onChange={this.handleChange}
            value={description}
          />
          <h5>Are you willing to hire remote candidates?</h5>
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
          <Link to={`/jobSkills/${jobId}`}>
            <button type="submit" onClick={this.handleSubmit}>
              Submit
            </button>
          </Link>
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
