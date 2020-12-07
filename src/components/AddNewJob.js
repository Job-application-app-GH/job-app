import React from 'react'
import {connect} from 'react-redux'
import {postNewJob} from '../store/job'
import {fetchOrganization} from '../store/organization'
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import {Link} from 'react-router-dom'

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

  handleSubmit(event) {
    event.preventDefault()
    this.props.newCandidate({...this.state}, this.props.organization.id)
    this.props.history.goBack()
    this.setState({
      title: '',
      location: '',
      description: '',
      isRemote: true,
    })
  }

  render() {
    console.log('PROPS', this.props.organization.id)
    const {title, location, description, isRemote} = this.state
    return (
      <div>
        <form onSubmit={this.handleSubmit} id="add-form">
          <h5>Job Title</h5>
          <input
            type="text"
            name="title"
            onChange={this.handleChange}
            value={title}
            required
          />
          <h5>Location</h5>
          <input
            type="text"
            name="location"
            onChange={this.handleChange}
            value={location}
            required
          />
          <h5>Job Description</h5>
          <textarea
            type="text"
            name="description"
            onChange={this.handleChange}
            value={description}
            required
          />

          <FormControl>
            <FormLabel>
              Are you willing to hire remote candidates?
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
          {/* <Link to="/profile/jobs"> */}
          <button type="submit">Submit</button>
          {/* </Link> */}
        </form>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    organization: state.organization,
  }
}

const mapDispatch = (dispatch) => {
  return {
    newCandidate: (job, id) => dispatch(postNewJob(job, id)),
    loadOrganization: (id) => dispatch(fetchOrganization(id)),
  }
}

export default connect(mapState, mapDispatch)(AddNewJob)
