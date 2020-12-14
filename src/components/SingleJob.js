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
    const job = this.props.job || {}
    const skills = this.props.skills
    return (
      <div className="global-screen-box">
        <OrgHeader />
        <div className="profile-edit-org">
          <h3
            style={{fontSize: '1.5em', marginTop: '7px', marginBottom: '5px'}}
          >
            {job.title}
          </h3>
          <Link to={`/profile/jobs/matches/${job.id}`}>
            <h2 style={{color: 'white'}}>View matches for this job</h2>
          </Link>

          <div className="view_profile">
            <h3>Location</h3>
            <h4>{job.location}</h4>
            <h3>Description</h3>
            <h4> {job.description}</h4>

            {
              job.isRemote ? (
                <h4>We are willing to hire remote candidates</h4>
              ) : null
              // <h3>Hiring remote candidates: no </h3>
            }
            <div className="view_profile_candidate">
              <h3>Skills</h3>
              {skills
                ? skills.map((skill) => (
                    <div key={skill.id}>
                      <p>{skill.name}</p>
                    </div>
                  ))
                : null}
            </div>
          </div>
          <div>
            <Link to={`/profile/jobs/edit/${job.id}`}>
              <button
                className="profile-edit-org-button"
                style={{marginBottom: '1px'}}
              >
                Edit
              </button>
            </Link>
          </div>
          <Link to="/profile/jobs">
            <h4>Back to job postings</h4>
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
