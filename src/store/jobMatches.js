import axios from 'axios'

//ACTION TYPES
const SET_SUGGESTED_JOBS = 'SET_SUGGESTED_JOBS'
const REMOVE_JOB = 'REMOVE_JOB'

//ACTION CREATORS
const setSuggestedJobs = (suggestedJobs) => ({
  type: SET_SUGGESTED_JOBS,
  suggestedJobs,
})

const removeJobFromList = (jobId) => ({
  type: REMOVE_JOB,
  jobId,
})

//THUNKS
export const fetchSuggestedJobs = (candidateId) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`/api/matches/candidate/${candidateId}`)
      console.log('inside THUNK fetch jobs: ', data)
      dispatch(setSuggestedJobs(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const sendJobMatch = (jobId, candidateId, isLiked) => {
  return async (dispatch) => {
    try {
      const matchRecord = {
        jobId: jobId,
        candidateId: candidateId,
        isLiked: isLiked,
      }
      await axios.post('/api/matches/candidate', matchRecord)
      dispatch(removeJobFromList(jobId))
    } catch (error) {
      console.error(error)
    }
  }
}

//INIT STATE
const initState = []

//REDUCER
export default function jobMatches(state = initState, action) {
  switch (action.type) {
    case SET_SUGGESTED_JOBS:
      return action.suggestedJobs
    case REMOVE_JOB:
      return state.filter((job) => job.id !== action.jobId)
    default:
      return state
  }
}
