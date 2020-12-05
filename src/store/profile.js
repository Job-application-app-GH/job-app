import axios from 'axios'

const GET_USER_DETAILS = 'GET_USER_DETAILS'
const UPDATE_PROFILE = 'UPDATE_PROFILE'

const getUserDetails = (details) => ({
  type: GET_USER_DETAILS,
  details,
})

const updateProfile = (details) => ({
  type: UPDATE_PROFILE,
  details,
})

export const fetchUserDetails = () => {
  return async (dispatch) => {
    try {
      let {data} = await axios.get('/api/profile')
      dispatch(getUserDetails(data))
    } catch (error) {
      console.log('error in fetch user details', error)
    }
  }
}

export const fetchUpdatedProfile = (profile) => {
  console.log('profile in thunk', profile)
  return async (dispatch) => {
    try {
      let {data} = axios.put('/api/profile', profile)
      console.log('data in thunk', data)
      dispatch(updateProfile(data))
    } catch (error) {
      console.log(error, 'error in update profile thunk')
    }
  }
}

const initialState = {}

export default function profile(state = initialState, action) {
  switch (action.type) {
    case GET_USER_DETAILS:
      return action.details
    case UPDATE_PROFILE:
      return action.details
    default:
      return state
  }
}
