import axios from 'axios'

//ACTION TYPES
const SET_SUGGESTED_CANDIDATES = 'SET_SUGGESTED_CANDIDATES'
const REMOVE_CANDIDATE = 'REMOVE_CANDIDATE'

//ACTION CREATORS
const setSuggestedCandidates = (suggestedCandidates) => ({
  type: SET_SUGGESTED_CANDIDATES,
  suggestedCandidates,
})

const removeCandidateFromList = (candidateId) => ({
  type: REMOVE_CANDIDATE,
  candidateId,
})

//THUNKS
export const fetchSuggestedCandidates = (jobId) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`/api/matches/job/${jobId}`)
      // console.log('inside THUNK fetch candidates: ', data)
      dispatch(setSuggestedCandidates(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const sendCandidateMatch = (jobId, candidateId, isLiked) => {
  return async (dispatch) => {
    try {
      const matchRecord = {
        jobId: jobId,
        candidateId: candidateId,
        isLiked: isLiked,
      }
      await axios.post('/api/matches/job', matchRecord)
      dispatch(removeCandidateFromList(candidateId))
    } catch (error) {
      console.error(error)
    }
  }
}

//INIT STATE
const initState = []

//REDUCER
export default function candidateMatches(state = initState, action) {
  switch (action.type) {
    case SET_SUGGESTED_CANDIDATES:
      return action.suggestedCandidates
    case REMOVE_CANDIDATE:
      return state.filter((candidate) => candidate.id !== action.candidateId)
    default:
      return state
  }
}
