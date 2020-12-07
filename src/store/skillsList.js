import axios from 'axios'

const GET_CANDIDATE_SKILLS = 'GET_CANDIDATE_SKILLS'
const GET_JOB_SKILLS = 'GET_JOB_SKILLS'

const getCanSkills = (skills) => ({
  type: GET_CANDIDATE_SKILLS,
  skills,
})
const getJSkills = (skills) => ({type: GET_JOB_SKILLS, skills})

export const fetchCandidateSkills = () => {
  return async (dispatch) => {
    try {
      let {data} = await axios.get(`/api/candidateSkills`)
      console.log('data from thunk-->jkf', data)
      dispatch(getCanSkills(data))
    } catch (error) {
      console.log(error, 'error in fetch can thunk')
    }
  }
}

export const fetchJobSkills = () => {
  return async (dispatch) => {
    try {
      let {data} = await axios.get('/api/jobSkills')
      dispatch(getJSkills(data))
    } catch (error) {
      console.log(error, 'error in fetch job skills')
    }
  }
}

const initalState = []

export default function skillsList(state = initalState, action) {
  switch (action.type) {
    case GET_CANDIDATE_SKILLS:
      return action.skills
    case GET_JOB_SKILLS:
      return action.skills
    default:
      return state
  }
}
