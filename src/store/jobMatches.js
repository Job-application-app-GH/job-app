import axios from 'axios'

//ACTION TYPES
const SET_SUGGESTED_JOBS = 'SET_SUGGESTED_JOBS'

//ACTION CREATORS
const setSuggestedJobs = (suggestedJobs) => ({
  type: SET_SUGGESTED_JOBS,
  suggestedJobs,
})

//THUNKS
export const fetchSuggestedJobs = () => {
  return async (dispatch) => {
    try {
      //ARCHANA: change the job id when you know how to get it
      const jobId = 1
      const {data} = await axios.get(`/api/matches/job/${jobId}`)
      //MARIA: change thunk .get with Archana
      console.log('inside THUNK fetch jobs: ', data)
      dispatch(setSuggestedJobs(data))
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
    default:
      return state
  }
}
