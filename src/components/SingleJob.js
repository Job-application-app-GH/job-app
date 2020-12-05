import React from 'react'
import {connect} from 'react-redux'
import {fetchUserDetails} from '../store/profile'
import {fetchSingleJob} from '../store/job'

class SingleJob extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.loadSingleJob(this.props.match.params.id)
  }

  render() {
    const job = this.props.job
    return (
      <div>
        <h3>Job Details</h3>
        <h5>Title: {job.title}</h5>
        <h5>Location: {job.location}</h5>
        <h5>Description: {job.description}</h5>
        {job.isRemote ? (
          <h5>Hiring remote candidates: yes </h5>
        ) : (
          <h5>Hiring remote candidates: no </h5>
        )}
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
    loadSingleJob: (id) => dispatch(fetchSingleJob(id)),
  }
}

export default connect(mapState, mapDispatch)(SingleJob)
