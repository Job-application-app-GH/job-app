import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleJob} from '../store/job'
import {Link} from 'react-router-dom'
import {destroyJob} from '../store/job'
import {fetchJobSkills} from '../store/skillsList'
import OrgHeader from './OrgHeader'

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
    return (
      <div className="global-screen-box">
        <div className="single-job-profile">
          <OrgHeader />
          {/* <h3>Job Details</h3> */}
          <Link to={`/profile/jobs/matches/${job.id}`}>
            <h2 style={{color: 'white'}}>View matches for this job</h2>
          </Link>

          <h3>Title: {job.title}</h3>
          <h3>Location: {job.location}</h3>
          <h3>Description:</h3>
          <p> {job.description}</p>
          {job.isRemote ? (
            <h3>Hiring remote candidates: yes </h3>
          ) : (
            <h3>Hiring remote candidates: no </h3>
          )}
          <h3>Skills</h3>
          {skills
            ? skills.map((skill) => (
                <div key={skill.id}>
                  <h4>{skill.name}</h4>
                </div>
              ))
            : null}
          <div>
            <Link to={`/profile/jobs/edit/${job.id}`}>
              <button className="profile-edit-org-button">Edit</button>
            </Link>
          </div>
          <Link to="/profile/jobs">
            <h4 style={{color: 'white'}}>Back to job postings</h4>
          </Link>
        </div>
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
