import React, {Component} from 'react'
import {connect} from 'react-redux'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
// import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
// import FormHelperText from '@material-ui/core/FormHelperText'
import Checkbox from '@material-ui/core/Checkbox'

import {
  getCandidateSkills,
  getJobSkills,
  modifySkill,
  saveCandidateSkills,
  saveJobSkills,
} from '../store'
// import UserSkills from './UserSkills'

class Skills extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(skillId, event) {
    // console.log(
    //   'selected skill: ' + skillId,
    //   event.target.name + ' selected: ' + event.target.checked
    // )
    console.log(
      'Inside handleClick, owner id: ',
      this.props.match.params.ownerId
    )
    this.props.modifySkill({id: skillId, selected: event.target.checked})
  }

  componentDidMount() {
    console.log(
      'Inside componentDidMount, owner id: ',
      this.props.match.params.ownerId
    )
    this.props.loadSkills(this.props.match.params.ownerId)
  }
  render() {
    console.log('Inside Skills render')
    return (
      <div className="skills_container">
        <FormControl component="fieldset">
          <FormLabel component="legend">Please select skills</FormLabel>

          {this.props.skills.map((skill) => (
            <FormControlLabel
              key={skill.id}
              control={
                <Checkbox
                  checked={skill.selected}
                  onChange={(e) => this.handleClick(skill.id, e)}
                  name={skill.name}
                />
              }
              label={skill.name}
            />
          ))}
        </FormControl>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    skills: state.selectedSkills,
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
  mapStateToProps,
  mapCandidateDispatchToProps
)(Skills)

export const JobSkills = connect(mapStateToProps, mapJobDispatchToProps)(Skills)
