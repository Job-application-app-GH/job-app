import axios from 'axios'

const CREATE_NEW_CANDIDATE = 'CREATE_NEW_CANDIDATE'
const GET_CANDIDATE = 'GET_CANDIDATE'

const createNewCandidate = (candidate) => ({
  type: CREATE_NEW_CANDIDATE,
  candidate,
})

const getCandidate = (candidate) => ({
  type: GET_CANDIDATE,
  candidate,
})

export const postNewCandidate = (candidate) => {
  console.log('candidate received in thunk->', candidate)
  return async (dispatch) => {
    try {
      let {data: newCandidate} = await axios.post('/api/candidate', candidate)
      console.log('data from axios inside post new candidate', newCandidate)
      dispatch(createNewCandidate(newCandidate))
    } catch (error) {
      console.log(error, 'error in post new candidate thunk :(')
    }
  }
}

export const fetchCandidate = () => {
  return async (dispatch) => {
    try {
      let {data} = await axios.get('/api/candidate')
      console.log('DATA FROM THUNK-->', data)
      dispatch(getCandidate(data))
    } catch (error) {
      console.log(error, 'error in fetch candidate thunk')
    }
  }
}

const initalState = {}

export default function candidate(state = initalState, action) {
  switch (action.type) {
    case CREATE_NEW_CANDIDATE:
      return action.candidate
    case GET_CANDIDATE:
      return action.candidate
    default:
      return state
  }
}
