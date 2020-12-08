import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const UPDATE_USER_TYPE = 'UPDATE_USER_TYPE'
const UPLOAD_IMAGE = 'UPLOAD_IMAGE'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = (user) => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const updateUserType = (user) => ({type: UPDATE_USER_TYPE, user})
const uploadImage = (user) => ({type: UPLOAD_IMAGE, user})

/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method, history) => async (dispatch) => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const putUserType = (type) => {
  return async (dispatch) => {
    try {
      let {data} = await axios.put('/api/users', type)
      dispatch(updateUserType(data))
    } catch (error) {
      console.log(error, 'error in put user type thunk')
    }
  }
}

// export const uploadAvatarImage = (img) => {
//   return async (dispatch) => {
//     try {
//       let {data} = await axios.put('/api/users/img', img)
//       dispatch(uploadImage(data))
//     } catch (error) {
//       console.log(error, 'error in img thunk')
//     }
//   }
// }

const ADD_USER = 'ADD_USER'
const addUser = (user) => {
  return {
    type: ADD_USER,
    user,
  }
}
export const signup = (
  email,
  password,
  history
  // userType
) => async (dispatch) => {
  let res
  console.log('email', email, 'password', password)

  try {
    res = await axios.post(`/auth/signup`, {
      email,
      password,
      // userType,
    })
    dispatch(addUser(res))
  } catch (signupError) {
    return dispatch(addUser({error: signupError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/signup/type')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async (dispatch) => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    // history.push('/')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function user(state = defaultUser, action) {
  switch (action.type) {
    case ADD_USER:
      return action.user
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case UPDATE_USER_TYPE:
      return action.user
    case UPLOAD_IMAGE:
      return action.user
    default:
      return state
  }
}
