import axios from 'axios'

const CREATE_NEW_CANDIDATE = 'CREATE_NEW_CANDIDATE'

const createNewCandidate = (userId) => ({
  type: CREATE_NEW_CANDIDATE,
  userId,
})

export const postNewCandidate = (candidate) => {
  console.log('candidate received in thunk->', candidate)
  return async (dispatch) => {
    try {
      let {data} = await axios.post('/api/candidate', candidate)
      dispatch(createNewCandidate(data))
    } catch (error) {
      console.log(error, 'error in post new candidate thunk :(')
    }
  }
}

const initalState = {}

export default function candidate(state = initalState, action) {
  switch (action.type) {
    case CREATE_NEW_CANDIDATE:
      return action.userId
    default:
      return state
  }
}
