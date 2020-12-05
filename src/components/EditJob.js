import React from 'react'
import {connect} from 'react-redux'
import {fetchUpdatedProfile} from '../store/profile'
import {fetchUpdatedJob, fetchSingleJob} from '../store/job'

class EditJob extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: this.props.job.title,
      location: this.props.job.location,
      description: this.props.job.description,
      isRemote: this.props.job.isRemote,
      id: this.props.job.id,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.loadSingleJob(this.props.match.params.id)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.loadUpdatedJob({...this.state})
    this.props.history.goBack()
  }
  render() {
    console.log(this.props, 'PROPS IN EDIT PROFILE')
    const {title, location, description, isRemote} = this.state
    return (
      <div>
        <h3>Edit My Profile</h3>
        <h5>Title</h5>
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
    job: state.job,
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadUpdatedJob: (job) => dispatch(fetchUpdatedJob(job)),
    loadSingleJob: (id) => dispatch(fetchSingleJob(id)),
  }
}

export default connect(mapState, mapDispatch)(EditJob)
