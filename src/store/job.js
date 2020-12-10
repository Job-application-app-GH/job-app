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
  return async (dispatch) => {
    try {
      const {data} = await axios.post(`/api/job/${id}`, job)
      dispatch(createNewJob(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const fetchAllJobs = (orgId) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`/api/job/allJobs/${orgId}`)

      dispatch(getAllJobs(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const fetchSingleJob = (id) => {
  return async (dispatch) => {
    try {
      let {data} = await axios.get(`/api/job/${id}`)
      dispatch(getSingleJob(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const fetchUpdatedJob = (job) => {
  return async (dispatch) => {
    try {
      let {data} = await axios.put(`/api/job/${job.id}`, job)
      dispatch(updateJob(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const destroyJob = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/job/${id}`)
      dispatch(deleteJob(id))
    } catch (error) {
      console.log(error)
    }
  }
}

const initalState = {}

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
    default:
      return state
  }
}
