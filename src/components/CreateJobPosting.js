import React from 'react'

class CreateJobPosting extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      jobTitle: '',
      location: '',
      description: '',
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
    this.setState({
      jobTitle: '',
      location: '',
      description: '',
    })
  }

  render() {
    const {jobTitle, location, description} = this.state
    return (
      <div>
        <h3>Create a new job posting</h3>
        <form>
          <div>
            <label htmlFor="jobTitle">
              <small>Job Title</small>
            </label>
            <input
              onChange={this.handleChange}
              value={jobTitle}
              className="form-control"
              name="jobTitle"
              required
            />
          </div>
          <div>
            <label htmlFor="location">
              <small>Location</small>
            </label>
            <input
              onChange={this.handleChange}
              value={location}
              className="form-control"
              name="location"
              required
            />
          </div>
          <div>
            <label htmlFor="description">
              <small>Description</small>
            </label>
            <textarea
              onChange={this.handleChange}
              value={description}
              className="form-control"
              name="description"
              required
            />
          </div>
        </form>
        <button type="submit" onClick={this.handleSubmit}>
          Save
        </button>
      </div>
    )
  }
}

export default CreateJobPosting
