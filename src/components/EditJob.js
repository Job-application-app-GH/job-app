import React from 'react'
import {connect} from 'react-redux'
import {fetchUpdatedProfile} from '../store/profile'
import {fetchUpdatedJob, fetchSingleJob} from '../store/job'
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import {Link} from 'react-router-dom'
import OrgHeader from './OrgHeader'

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
    const {title, location, description, isRemote} = this.state
    return (
      <div className='global-screen-box'>
        <OrgHeader/>
        <div className='edit-job-form-container'>
        <form  className="edit-job-form" ondidatnSubmit={this.handleSubmit}>
          <h3>Title</h3>
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
          <h3>Description</h3>
          <input
            type="text"
            name="description"
            onChange={this.handleChange}
            value={description}
            required
          />
          <h3>Do you hire remote employees?</h3>
          <FormControl>
            <FormLabel>
              <FormLabel />
              <RadioGroup
                name="isRemote"
                onChange={this.handleChange}
                value={isRemote}
                row
              >
              <div className='profile-edit-org-yes-no'>
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
                </div>
              </RadioGroup>
            </FormLabel>
          </FormControl>
        <Link 
        to={`/profile/jobs/editskills/${this.props.job.id}`}>
          <button className='profile-edit-org-button'>Edit job skills</button>
        </Link>
          <button className='profile-edit-org-button' type="submit">Save Changes</button>
        </form>
        </div>
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
