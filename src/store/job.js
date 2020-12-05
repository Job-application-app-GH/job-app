import axios from 'axios'

const CREATE_NEW_JOB = 'CREATE_NEW_JOB'
const GET_SINGLE_JOB = 'GET_SINGLE_JOB'
const UPDATE_JOB = 'UPDATE_JOB'

const createNewJob = (organizationId) => ({
  type: CREATE_NEW_JOB,
  organizationId,
})

const getSingleJob = (job) => ({
  type: GET_SINGLE_JOB,
  job,
})

const updateJob = (job) => ({
  type: UPDATE_JOB,
  job,
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

export const fetchSingleJob = (id) => {
  return async (dispatch) => {
    try {
      let {data} = await axios.get(`/api/job/${id}`)
      dispatch(getSingleJob(data))
    } catch (error) {
      console.log(error, 'error in fetch job')
    }
  }
}

export const fetchUpdatedJob = (job) => {
  console.log('job in thunk', job)
  return async (dispatch) => {
    try {
      let {data} = await axios.put(`/api/job/${job.id}`, job)
      dispatch(updateJob(data))
    } catch (error) {
      console.log(error, 'error in update job thunk')
    }
  }
}

const initalState = []

export default function job(state = initalState, action) {
  switch (action.type) {
    case CREATE_NEW_JOB:
      return action.organizationId
    case GET_SINGLE_JOB:
      return action.job
    case UPDATE_JOB:
      return action.job
    default:
      return state
  }
}
