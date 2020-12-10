import React from 'react'
import {putUserType} from '../store/user'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import jobImg from '../styles/wd.svg'
import empImg from '../styles/business.svg'

class ProfileType extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className='signup-type-container'>
        <Link to="/signup/candidate">
        <div className='upper-img-type'>
          <img src={jobImg}   className='profile-type-img' alt="" />
        </div>
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
        <div>
          <img src={empImg}   className='profile-type-img' alt="" />
        </div>
          <button
          className='signup-type-buttons'
            onClick={() =>
              this.props.updateUserType({userType: 'ORGANIZATION'})
            }
          >
            LOOKING TO HIRE
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
