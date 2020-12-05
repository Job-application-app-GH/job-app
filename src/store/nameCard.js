import axios from 'axios'



//ACTION TYPES
const SET_USER = 'SET_USER'

//ACTION CREATORS
const setUser = user => ({
  type: SET_USER,
  user
})

//THUNKS
export const fetchUser = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/namecard`)
      dispatch(setUser(data))
    } catch (error) {
      console.error(error)
    }
  }
}
//INIT STATE
const initState = []

//REDUCER
export default function nameCard(state = initState, action) {
  switch (action.type) {
    case SET_USER:
      return action.user
    default:
      return state
  }
}