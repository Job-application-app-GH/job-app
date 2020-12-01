import axios from 'axios'

// org
// 1. create account w/ {companyName, location, email, password} POST req to create a new row in users table
// 2. create job posting w/ {jobTitle, location, description} POST req to create a new job in jobs table (needs userId)
// 3. add skills -> clicking JavaScript sends a POST req to Job_Skills (deselecting sends a delete req to Job_Skills) (needs userId, jobId)

const CREATE_NEW_JOB = 'CREATE_NEW_JOB'

const createNewJob = (userId) => ({
  type: CREATE_NEW_JOB,
  userId,
})

export const postNewJob = (job) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.post('/api/jobs', job)
      dispatch(createNewJob(data))
    } catch (error) {
      console.log(error, 'error in post new job thunk')
    }
  }
}

const initalState = {}

export default function job(state = initalState, action) {
  switch (action.type) {
    case CREATE_NEW_JOB:
      return action.userId
    default:
      return state
  }
}
