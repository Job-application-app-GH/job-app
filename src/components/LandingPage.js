import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

class LandingPage extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    let link
    if (this.props.user.userType === 'CANDIDATE') {
      link = '/findCandidates'
    } else {
      link = '/findJobs'
    }
    return (
      <div>
        <h2>This is the landing page!</h2>
        <Link to={link}>
          <button>Get Started</button>
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

export default connect(mapState)(LandingPage)
