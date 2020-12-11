import axios from 'axios'

//ACTION TYPES
const SET_SUGGESTED_CANDIDATES = 'SET_SUGGESTED_CANDIDATES'
const REMOVE_CANDIDATE = 'REMOVE_CANDIDATE'
const RESET_LAST_MATCH = 'RESET_LAST_MATCH'

//ACTION CREATORS
const setSuggestedCandidates = (suggestedCandidates) => ({
  type: SET_SUGGESTED_CANDIDATES,
  suggestedCandidates,
})

const removeCandidateFromList = (candidateId, latestMatch) => ({
  type: REMOVE_CANDIDATE,
  candidateId,
  latestMatch,
})

const resetLastMatch = (latestMatch) => ({
  type: RESET_LAST_MATCH,
  latestMatch,
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
      const {data: latestMatch} = await axios.post(
        '/api/matches/job',
        matchRecord
      )
      console.log('latestMatch is: ', latestMatch)
      dispatch(removeCandidateFromList(candidateId, latestMatch))
    } catch (error) {
      console.error(error)
    }
  }
}

export const resetLastCandidateMatch = () => {
  return async (dispatch) => {
    try {
      const resetMatch = {isPerfectMatch: false, matchedCandidate: {}}
      dispatch(resetLastMatch(resetMatch))
    } catch (error) {}
  }
}

//INIT STATE
const initState = {
  list: [],
  lastMatch: {isPerfectMatch: false, matchedCandidate: {}},
}

//REDUCER
export default function candidateMatches(state = initState, action) {
  switch (action.type) {
    case SET_SUGGESTED_CANDIDATES:
      return {...state, list: action.suggestedCandidates}
    case REMOVE_CANDIDATE:
      const modifiedList = state.list.filter(
        (candidate) => candidate.id !== action.candidateId
      )
      console.log('last match type inside reducer is: ', action.latestMatch)
      return {...state, list: modifiedList, lastMatch: action.latestMatch}
    case RESET_LAST_MATCH:
      return {...state, lastMatch: action.latestMatch}
    default:
      return state
  }
}
