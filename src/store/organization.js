import axios from 'axios'

const CREATE_NEW_ORGANIZATION = 'CREATE_NEW_ORGANIZATION'
const GET_ORGANIZATION = 'GET_ORGANIZATION'

const createNewOrganization = (organization) => ({
  type: CREATE_NEW_ORGANIZATION,
  organization,
})

const getOrganization = (organization) => ({
  type: GET_ORGANIZATION,
  organization,
})

export const postNewOrganization = (organization) => {
  console.log('organization--->', organization)
  return async (dispatch) => {
    try {
      let {data} = await axios.post('/api/organization', organization)
      console.log('data--->', data)
      dispatch(createNewOrganization(data))
    } catch (error) {
      console.log(error, 'error in post new org thunk')
    }
  }
}

export const fetchOrganization = (id) => {
  return async (dispatch) => {
    try {
      let {data} = await axios.get('/api/organization')
      dispatch(getOrganization(data))
    } catch (error) {
      console.log(error, 'error in fetch org thunk')
    }
  }
}

const initialState = {}

export default function organization(state = initialState, action) {
  switch (action.type) {
    case CREATE_NEW_ORGANIZATION:
      return action.organization
    case GET_ORGANIZATION:
      return action.organization
    default:
      return state
  }
}
