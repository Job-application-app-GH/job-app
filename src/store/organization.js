import axios from 'axios'

const CREATE_NEW_ORGANIZATION = 'CREATE_NEW_ORGANIZATION'

const createNewOrganization = (userId) => ({
  type: CREATE_NEW_ORGANIZATION,
  userId,
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

const initialState = {}

export default function organization(state = initialState, action) {
  switch (action.type) {
    case CREATE_NEW_ORGANIZATION:
      return action.userId
    default:
      return state
  }
}
