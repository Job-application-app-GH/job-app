import axios from 'axios'

const SET_SKILLS = 'SET_SKILLS'
const MODIFY_SKILL = 'MODIFY_SKILL'
const SAVE_SKILLS = 'SAVE_SKILLS'

// const DUMMY_SKILLS_LIST = [
//   {id: 1, name: 'C++'},
//   {id: 2, name: 'JavaScript'},
//   {id: 3, name: 'SQL'},
//   {id: 4, name: 'HTML'},
// ]

/**
 * ACTION CREATORS
 */
const setSkills = (selectedSkills) => ({type: SET_SKILLS, selectedSkills})
export const modifySkill = (skill) => ({type: MODIFY_SKILL, skill})
const saveSkills = () => ({type: SAVE_SKILLS})

/**
 * THUNK CREATORS
 */
export const getCandidateSkills = (candidateId) => async (dispatch) => {
  try {
    // console.log('Inside the getCandidateSkills thunk')
    //Access API to get the skills list from DB table candidate_skills
    const {data: selectedSkills} = await axios.get(
      `/api/candidateSkills/${candidateId}`
    )
    // console.log('Received selectedSkills from db: ', selectedSkills)
    // console.log('dispatching set skills')
    dispatch(setSkills(selectedSkills))
  } catch (err) {
    console.error(err)
  }
}

export const getJobSkills = (jobId) => async (dispatch) => {
  try {
    // console.log('Inside the getJobSkills thunk')
    //Access API to get the skills list from DB table candidate_skills
    const {data: selectedSkills} = await axios.get(`/api/jobSkills/${jobId}`)
    // console.log('Received selectedSkills from db: ', selectedSkills)
    // console.log('dispatching set skills')
    dispatch(setSkills(selectedSkills))
  } catch (err) {
    console.error(err)
  }
}

export const saveCandidateSkills = (candidateId, candidateSkills) => async (
  dispatch
) => {
  try {
    await axios.post(`/api/candidateSkills/${candidateId}`, candidateSkills)
    dispatch(saveSkills())
  } catch (err) {
    console.error(err)
  }
}

export const saveJobSkills = (jobId, jobSkills) => async (dispatch) => {
  try {
    await axios.post(`/api/jobSkills/${jobId}`, jobSkills)
    dispatch(saveSkills())
  } catch (err) {
    console.error(err)
  }
}

const initialState = []

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_SKILLS:
      // console.log(action.selectedSkills)
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
    default:
      return state
  }
}
