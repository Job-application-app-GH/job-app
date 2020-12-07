import axios from 'axios'

const GET_JOB_MATCHES = 'GET_JOB_MATCHES'

const getJobMatches = (matches) => ({
  type: GET_JOB_MATCHES,
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

const initialState = []

export default function profileMatches(state = initialState, action) {
  switch (action.type) {
    case GET_JOB_MATCHES:
      return action.matches
    default:
      return state
  }
}
