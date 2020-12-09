import React from 'react'
import {putUserType} from '../store/user'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class ProfileType extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className='signup-type-container'>
        <Link to="/signup/candidate">
          <button
            className='signup-type-buttons'
            onClick={() =>
              this.props.updateUserType({
                userType: 'CANDIDATE',
              })
            }
          >
            LOOKING FOR A JOB
          </button>
        </Link>
        <Link to="/signup/organization">
          <button
          className='signup-type-buttons'
            onClick={() =>
              this.props.updateUserType({userType: 'ORGANIZATION'})
            }
          >
            LOOKING TO HIRE SOMEONE GREAT
          </button>
        </Link>
      </div>
    )
  }
}

const mapDispatch = (dispatch) => {
  return {
    updateUserType: (type) => dispatch(putUserType(type)),
  }
}

export default connect(null, mapDispatch)(ProfileType)
