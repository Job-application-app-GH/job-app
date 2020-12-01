import React from 'react'
import {Link} from 'react-router-dom'

function ProfileType(props) {
  return (
    <div>
      <Link to="/signup/candidate">
        <button>I am looking for a job</button>
      </Link>
      <Link to="/signup/organization">
        <button>I need to hire someone</button>
      </Link>
    </div>
  )
}

export default ProfileType
