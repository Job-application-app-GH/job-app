import React, {Component} from 'react'
import {connect} from 'react-redux'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

import {
  getCandidateSkills,
  getJobSkills,
  modifySkill,
  saveCandidateSkills,
  saveJobSkills,
} from '../store'

class Skills extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleSaveSkills = this.handleSaveSkills.bind(this)
  }

  handleClick(skillId, event) {
    this.props.modifySkill({id: skillId, selected: event.target.checked})
  }

  handleSaveSkills() {
    this.props.saveSkills(this.props.match.params.ownerId, this.props.skills)
    this.props.history.push('/onboarding')
  }

  componentDidMount() {
    this.props.loadSkills(this.props.match.params.ownerId)
  }

  render() {
    return (
      <div className="global-screen-box">
        <FormControl component="fieldset">
          <FormLabel className="skills-box-container" component="legend">
            <div style={{fontSize: '1.35rem'}}>{this.props.displayName}</div>
          </FormLabel>
          <div className="skills_list">
            {this.props.skills.map((skill) => (
              <FormControlLabel
                key={skill.id}
                control={
                  <Checkbox
                    style={{color: 'white', transform: 'scale(1.3)'}}
                    checked={skill.selected}
                    onChange={(event) => this.handleClick(skill.id, event)}
                    name={skill.name}
                    size="large"
                  />
                }
                label={<span style={{fontSize: '1.3rem'}}>{skill.name}</span>}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={this.handleSaveSkills}
            className="upload-img-button"
            style={{padding: '15px 80px'}}
          >
            SUBMIT
          </button>
        </FormControl>
      </div>
    )
  }
}

const mapCandidateStateToProps = (state) => {
  return {
    displayName: 'Select your skills',
    skills: state.selectedSkills,
    user: state.user,
  }
}
const mapJobStateToProps = (state) => {
  return {
    displayName: 'Select required skills',
    skills: state.selectedSkills,
    user: state.user,
  }
}

const mapCandidateDispatchToProps = (dispatch) => {
  return {
    loadSkills: (candidateId) => dispatch(getCandidateSkills(candidateId)),
    modifySkill: (skill) => dispatch(modifySkill(skill)),
    saveSkills: (candidateId, candidateSkills) =>
      dispatch(saveCandidateSkills(candidateId, candidateSkills)),
  }
}
const mapJobDispatchToProps = (dispatch) => {
  return {
    loadSkills: (jobId) => dispatch(getJobSkills(jobId)),
    modifySkill: (skill) => dispatch(modifySkill(skill)),
    saveSkills: (jobId, jobSkills) => dispatch(saveJobSkills(jobId, jobSkills)),
  }
}

export const CandidateSkills = connect(
  mapCandidateStateToProps,
  mapCandidateDispatchToProps
)(Skills)

export const JobSkills = connect(
  mapJobStateToProps,
  mapJobDispatchToProps
)(Skills)
