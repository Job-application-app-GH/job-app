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
    let formDisplayName = ''
    if (this.props.user.userType === 'CANDIDATE') {
      candidate = 'CANDIDATE'
      formDisplayName = 'Select your skills'
    } else {
      formDisplayName = 'Select required skills'
    }
    return (
      <div className="global-screen-box">
        {candidate ? <Header /> : <OrgHeader />}
        <div className="skills_container">
          <FormControl component="fieldset">
            <FormLabel component="legend">
              <div style={{fontSize: '1.35rem'}}>{formDisplayName}</div>
            </FormLabel>
            <div className="skills_list">
              {this.props.skills.map((skill) => (
                <FormControlLabel
                  key={skill.id}
                  control={
                    <Checkbox
                      style={{color: 'white', transform: 'scale(1.3'}}
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
