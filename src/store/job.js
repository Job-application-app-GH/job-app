import axios from 'axios'

const CREATE_NEW_JOB = 'CREATE_NEW_JOB'
const GET_ALL_JOBS = 'GET_ALL_JOBS'
const GET_SINGLE_JOB = 'GET_SINGLE_JOB'
const UPDATE_JOB = 'UPDATE_JOB'
const DELETE_JOB = 'DELETE_JOB'

const createNewJob = (organizationId) => ({
  type: CREATE_NEW_JOB,
  organizationId,
})

const getAllJobs = (jobs) => ({
  type: GET_ALL_JOBS,
  jobs,
})

const getSingleJob = (job) => ({
  type: GET_SINGLE_JOB,
  job,
})

const updateJob = (job) => ({
  type: UPDATE_JOB,
  job,
})

const deleteJob = (id) => ({
  type: DELETE_JOB,
  id,
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

export const fetchAllJobs = (orgId) => {
  console.log('orgId: ', orgId)
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`/api/jobs/${orgId}`)
      dispatch(getAllJobs(data))
    } catch (error) {
      console.log(error, 'error in fetch all jobs thunk')
    }
  }
}

export const fetchSingleJob = (id) => {
  return async (dispatch) => {
    try {
      let {data} = await axios.get(`/api/job/${id}`)
      console.log('single job data', data)
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

export const destroyJob = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/job/${id}`)
      dispatch(deleteJob(id))
    } catch (error) {
      console.log(error, 'error in destroy job thunk')
    }
  }
}

const initalState = []

export default function job(state = initalState, action) {
  switch (action.type) {
    case CREATE_NEW_JOB:
      return action.organizationId
    case GET_ALL_JOBS:
      return action.jobs
    case GET_SINGLE_JOB:
      return action.job
    case UPDATE_JOB:
      return action.job
    case DELETE_JOB:
      return [...state.filter((job) => job.id !== action.id)]
    default:
      return state
  }
}
