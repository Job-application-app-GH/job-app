import axios from 'axios'

//ACTION TYPES
const SET_SUGGESTED_CANDIDATES = 'SET_SUGGESTED_CANDIDATES'

//ACTION CREATORS
const setSuggestedCandidates = (suggestedCandidates) => ({
  type: SET_SUGGESTED_CANDIDATES,
  suggestedCandidates,
})

//THUNKS
export const fetchSuggestedCandidates = () => {
  return async (dispatch) => {
    try {
      //ARCHANA: change the job id when you know how to get it
      const jobId = 1
      const {data} = await axios.get(`/api/matches/job/${jobId}`)
      console.log('inside THUNK fetch candidates: ', data)
      dispatch(setSuggestedCandidates(data))
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
    default:
      return state
  }
}
