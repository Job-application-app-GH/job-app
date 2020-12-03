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
                userId: this.props.user.id,
                userType: 'CANDIDATE',
              })
            }
          >
            I am looking for a job
          </button>
        </Link>
        <Link to="/signup/organization">
          <button onClick={() => this.props.updateUserType('ORGANIZATION')}>
            I need to hire someone
          </button>
        </Link>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    user: state.user,
  }
}

const mapDispatch = (dispatch) => {
  return {
    updateUserType: (type) => putUserType(type),
  }
}

export default connect(mapState, mapDispatch)(ProfileType)
