import axios from 'axios'

const GET_JOB_MATCHES = 'GET_JOB_MATCHES'
const GET_CANDIDATE_MATCHES = 'GET_CANDIDATE_MATCHES'

const getJobMatches = (matches) => ({
  type: GET_JOB_MATCHES,
  matches,
})

export const getCandidateMatches = (matches) => ({
  type: GET_CANDIDATE_MATCHES,
  matches,
})

export const fetchJobMatches = (jobId) => {
  return async (dispatch) => {
    try {
      let {data} = await axios.get(`/api/profileMatches/${jobId}`)
      dispatch(getJobMatches(data))
    } catch (error) {
      console.log(error, 'error in fetch job matches')
    }
  }
}

export const fetchCandidateMatches = (candidateId) => {
  return async (dispatch) => {
    try {
      console.log('can ID-->', candidateId)
      let {data} = await axios.get(`/api/profileMatches/user/${candidateId}`)
      console.log('data from fetch can match', data)
      dispatch(getCandidateMatches(data))
    } catch (error) {
      console.log(error)
    }
  }
}

const initialState = []

export default function profileMatches(state = initialState, action) {
  switch (action.type) {
    case GET_JOB_MATCHES:
      return action.matches
    case GET_CANDIDATE_MATCHES:
      return action.matches
    default:
      return state
  }
}
