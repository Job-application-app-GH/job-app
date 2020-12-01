import React from 'react'

function CreateJobPosting(props) {
  return (
    <div>
      <h3>Create a new job posting</h3>
      <form>
        <div>
          <label htmlFor="jobTitle">
            <small>Job Title</small>
          </label>
          <input className="form-control" name="jobTitle" required />
        </div>
        <div>
          <label htmlFor="location">
            <small>Location</small>
          </label>
          <input className="form-control" name="location" required />
        </div>
        <div>
          <label htmlFor="description">
            <small>Description</small>
          </label>
          <input className="form-control" name="description" required />
        </div>
      </form>
      <button>Save</button>
    </div>
  )
}

export default CreateJobPosting
