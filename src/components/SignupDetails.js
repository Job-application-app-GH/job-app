import React from 'react'
import {connect} from 'react-redux'
import {postNewCandidate} from '../store/candidate'

class SignUpDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      location: '',
      currentCompany: '',
      currentRole: '',
      description: '',
      // isRemote: true,
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
    this.props.newCandidate({...this.state})
    this.setState({
      name: '',
      location: '',
      currentCompany: '',
      currentRole: '',
      description: '',
      // isRemote: true,
    })
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
    return (
      <div>
        <form id="add-form">
          <h5>Full Name</h5>
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
          <h5>Current Company</h5>
          <input
            type="text"
            name="currentCompany"
            onChange={this.handleChange}
            value={currentCompany}
          />
          <h5>Current Role</h5>
          <input
            type="text"
            name="currentRole"
            onChange={this.handleChange}
            value={currentRole}
          />
          <h5>Tell us about yourself </h5>
          <textarea
            type="text"
            name="description"
            onChange={this.handleChange}
            value={description}
          />
          {/* <h5>Are you willing to work remote?</h5> */}
          {/* <input
            type="radio"
            name="isRemote"
            checked={isRemote === true}
            onChange={this.handleChange}
            value={isRemote}
          /> */}

          <button type="submit" onClick={this.handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    )
  }
}

const mapDispatch = (dispatch) => {
  return {
    newCandidate: (candidate) => dispatch(postNewCandidate(candidate)),
  }
}

export default connect(null, mapDispatch)(SignUpDetails)
