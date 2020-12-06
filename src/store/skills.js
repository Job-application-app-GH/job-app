import axios from 'axios'

const SET_SKILLS = 'SET_SKILLS'
const MODIFY_SKILL = 'MODIFY_SKILL'
const SAVE_SKILLS = 'SAVE_SKILLS'
const GET_CANDIDATE_SKILLS = 'GET_CANDIDATE_SKILLS'

/**
 * ACTION CREATORS
 */
const setSkills = (selectedSkills) => ({type: SET_SKILLS, selectedSkills})
export const modifySkill = (skill) => ({type: MODIFY_SKILL, skill})
const saveSkills = () => ({type: SAVE_SKILLS})
const getCanSkills = (skills) => ({
  type: GET_CANDIDATE_SKILLS,
  skills,
})

/**
 * THUNK CREATORS
 */

export const fetchCandidateSkills = () => {
  return async (dispatch) => {
    try {
      let {data} = await axios.get(`/api/candidateSkills`)
      dispatch(getCanSkills(data))
    } catch (error) {
      console.log(error, 'error in fetch can thunk')
    }
  }
}

export const getCandidateSkills = (candidateId) => async (dispatch) => {
  try {
    const {data: selectedSkills} = await axios.get(
      `/api/candidateSkills/${candidateId}`
    )

    dispatch(setSkills(selectedSkills))
  } catch (err) {
    console.error(err)
  }
}

export const getJobSkills = (jobId) => async (dispatch) => {
  try {
    const {data: selectedSkills} = await axios.get(`/api/jobSkills/${jobId}`)

    dispatch(setSkills(selectedSkills))
  } catch (err) {
    console.error(err)
  }
}

export const saveCandidateSkills = (candidateId, skills) => async (
  dispatch
) => {
  try {
    await axios.post(`/api/candidateSkills/${candidateId}`, {skills})
    dispatch(saveSkills())
  } catch (err) {
    console.error(err)
  }
}

export const saveJobSkills = (jobId, skills) => async (dispatch) => {
  try {
    await axios.post(`/api/jobSkills/${jobId}`, {skills})
    dispatch(saveSkills())
  } catch (err) {
    console.error(err)
  }
}

const initialState = []

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_SKILLS:
      return action.selectedSkills
    case MODIFY_SKILL:
      const newState = state.map((skill) => {
        if (skill.id === action.skill.id) {
          skill.selected = action.skill.selected
        }
        return skill
      })
      return newState
    case SAVE_SKILLS:
      return initialState
    case GET_CANDIDATE_SKILLS:
      return action.skills
    default:
      return state
  }
}
