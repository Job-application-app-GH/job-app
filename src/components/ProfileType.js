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
      <div>
        <Link to="/signup/candidate">
          <button
            onClick={() =>
              this.props.updateUserType({
                userType: 'CANDIDATE',
              })
            }
          >
            I am looking for a job
          </button>
        </Link>
        <Link to="/signup/organization">
          <button
            onClick={() =>
              this.props.updateUserType({userType: 'ORGANIZATION'})
            }
          >
            I need to hire someone
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
