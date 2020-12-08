import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleJob} from '../store/job'
import {Link} from 'react-router-dom'
import {destroyJob} from '../store/job'
import {fetchJobSkills} from '../store/skillsList'
import Header from './Header'

class SingleJob extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.loadSingleJob(this.props.match.params.id)
    this.props.loadJobSkills(this.props.match.params.id)
  }

  render() {
    const job = this.props.job
    const skills = this.props.skills
    console.log('PROPS-->', this.props.skills)
    return (
      <div>
        <Header />
        <h3>Job Details</h3>

        <Link to="/profile/jobs">
          <button>Back to job postings</button>
        </Link>
        {/* <Link to="/profile/jobs">
          <button onClick={() => this.props.deleteJob(job.id)}>
            Remove this job
          </button>
        </Link> */}
        <Link to={`/profile/jobs/edit/${job.id}`}>
          <button>Edit</button>
        </Link>

        <h5>Title: {job.title}</h5>
        <h5>Location: {job.location}</h5>
        <h5>Description: {job.description}</h5>
        {job.isRemote ? (
          <h5>Hiring remote candidates: yes </h5>
        ) : (
          <h5>Hiring remote candidates: no </h5>
        )}
        <h5>Skills</h5>
        {skills
          ? skills.map((skill) => (
              <div key={skill.id}>
                <p>{skill.name}</p>
              </div>
            ))
          : null}
        <Link to={`/profile/jobs/matches/${job.id}`}>
          <button>View matches for this job</button>
        </Link>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    job: state.job,
    skills: state.skillsList,
  }
}

const mapDispatch = (dispatch) => {
  return {
    deleteJob: (id) => dispatch(destroyJob(id)),
    loadSingleJob: (id) => dispatch(fetchSingleJob(id)),
    loadJobSkills: (id) => dispatch(fetchJobSkills(id)),
  }
}

export default connect(mapState, mapDispatch)(SingleJob)
