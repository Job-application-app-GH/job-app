import axios from 'axios'

const CREATE_NEW_JOB = 'CREATE_NEW_JOB'

const createNewJob = (organizationId) => ({
  type: CREATE_NEW_JOB,
  organizationId,
})

export const postNewJob = (job, id) => {
  console.log(job, id)
  return async (dispatch) => {
    try {
      const {data} = await axios.post(`/api/job/${id}`, job)
      dispatch(createNewJob(data))
    } catch (error) {
      console.log(error, 'error in post new job thunk')
    }
  }
}

const initalState = []

export default function job(state = initalState, action) {
  switch (action.type) {
    case CREATE_NEW_JOB:
      return action.organizationId

    default:
      return state
  }
}
