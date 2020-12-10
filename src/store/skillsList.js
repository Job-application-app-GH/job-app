import axios from 'axios'

const GET_CANDIDATE_SKILLS = 'GET_CANDIDATE_SKILLS'
const GET_JOB_SKILLS = 'GET_JOB_SKILLS'

const getCanSkills = (skills) => ({
  type: GET_CANDIDATE_SKILLS,
  skills,
})
const getJSkills = (skills) => ({type: GET_JOB_SKILLS, skills})

//
export const fetchCandidateSkills = (candidateId) => {
  return async (dispatch) => {
    try {
      let {data} = await axios.get(`/api/candidateSkills/${candidateId}`)
      const currentCandidateSkills = data.filter((skill) => skill.selected)
      dispatch(getCanSkills(currentCandidateSkills))
    } catch (error) {
      console.log(error)
    }
  }
}

export const fetchJobSkills = (jobId) => {
  return async (dispatch) => {
    try {
      let {data} = await axios.get(`/api/jobSkills/${jobId}`)
      const currentJobSkills = data.filter((skill) => skill.selected)
      dispatch(getJSkills(currentJobSkills))
    } catch (error) {
      console.log(error)
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
