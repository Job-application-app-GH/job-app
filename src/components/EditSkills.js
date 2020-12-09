import React, {Component} from 'react'
import {connect} from 'react-redux'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Header from './Header'
import OrgHeader from './OrgHeader'

import {
  getCandidateSkills,
  getJobSkills,
  modifySkill,
  saveCandidateSkills,
  saveJobSkills,
} from '../store'

class EditSkills extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleSaveSkills = this.handleSaveSkills.bind(this)
  }

  handleClick(skillId, event) {
    this.props.modifySkill({id: skillId, selected: event.target.checked})
  }

  handleSaveSkills() {
    this.props.saveSkills(this.props.match.params.id, this.props.skills)
    // this.props.history.push('/')
    this.props.history.goBack()
  }

  componentDidMount() {
    this.props.loadSkills(this.props.match.params.id)
  }

  render() {
    let candidate
    if (this.props.user.userType === 'CANDIDATE') {
      candidate = 'CANDIDATE'
    }
    return (
      <div className="skills_container">
        {candidate ? <Header /> : <OrgHeader />}
        <FormControl component="fieldset">
          <FormLabel component="legend">Please select skills</FormLabel>
          <div className="skills_list">
            {this.props.skills.map((skill) => (
              <FormControlLabel
                key={skill.id}
                control={
                  <Checkbox
                    checked={skill.selected}
                    onChange={(event) => this.handleClick(skill.id, event)}
                    name={skill.name}
                    size="large"
                  />
                }
                label={skill.name}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={this.handleSaveSkills}
            className="skills_button"
          >
            Save Skills
          </button>
        </FormControl>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
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

export const EditCandidateSkills = connect(
  mapStateToProps,
  mapCandidateDispatchToProps
)(EditSkills)

export const EditJobSkills = connect(
  mapStateToProps,
  mapJobDispatchToProps
)(EditSkills)
