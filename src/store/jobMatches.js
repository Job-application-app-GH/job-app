import axios from 'axios'

//ACTION TYPES
const SET_SUGGESTED_JOBS = 'SET_SUGGESTED_JOBS'
const REMOVE_JOB = 'REMOVE_JOB'
const RESET_LAST_MATCH = 'RESET_LAST_MATCH'

//ACTION CREATORS
const setSuggestedJobs = (suggestedJobs) => ({
  type: SET_SUGGESTED_JOBS,
  suggestedJobs,
})

const removeJobFromList = (jobId, latestMatch) => ({
  type: REMOVE_JOB,
  jobId,
  latestMatch,
})

const resetLastMatch = (latestMatch) => ({
  type: RESET_LAST_MATCH,
  latestMatch,
})

//THUNKS
export const fetchSuggestedJobs = (candidateId) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`/api/matches/candidate/${candidateId}`)
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
      const {data: latestMatch} = await axios.post(
        '/api/matches/candidate',
        matchRecord
      )
      dispatch(removeJobFromList(jobId, latestMatch))
    } catch (error) {
      console.error(error)
    }
  }
}

export const resetLastJobMatch = () => {
  return async (dispatch) => {
    try {
      const resetMatch = {isPerfectMatch: false, matchedJob: {}}
      dispatch(resetLastMatch(resetMatch))
    } catch (error) {}
  }
}

//INIT STATE
const initState = {
  list: [],
  lastMatch: {isPerfectMatch: false, matchedJob: {}},
}

//REDUCER
export default function jobMatches(state = initState, action) {
  switch (action.type) {
    case SET_SUGGESTED_JOBS:
      return {...state, list: action.suggestedJobs}
    case REMOVE_JOB:
      const modifiedList = state.list.filter((job) => job.id !== action.jobId)
      return {...state, list: modifiedList, lastMatch: action.latestMatch}
    case RESET_LAST_MATCH:
      return {...state, lastMatch: action.latestMatch}
    default:
      return state
  }
}
