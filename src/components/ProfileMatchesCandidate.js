import React from 'react'
import {fetchCandidateMatches} from '../store/profileMatches'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Header from './Header'

class JobMatches extends React.Component {
  constructor(props) {
    super(props)
    this.goBack = this.goBack.bind(this)
  }

  componentDidMount() {
    this.props.loadMatches(this.props.match.params.id)
  }

  goBack() {
    this.props.history.goBack()
  }

  render() {
    const matches = this.props.profileMatches
    return (
      <div className="global-screen-box">
        <Header />
        <div className="profile-matches-container">
          {matches.length ? (
            matches.map((match) => (
              <div>
                <h2 style={{color: 'white'}}>Your Matches</h2>
                <Link to={`/jobmatches/${match.job.id}`}>
                  <button className="profile-match">
                    <h5>{match.job.organization.name}</h5>
                    <h5>{match.job.title}</h5>
                  </button>
                </Link>
              </div>
            ))
          ) : (
            <h2>You do not have any matches yet!</h2>
          )}
          {/* <button onClick={this.goBack}>Return to profile</button> */}
        </div>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    profileMatches: state.profileMatches,
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadMatches: (id) => dispatch(fetchCandidateMatches(id)),
  }
}

export default connect(mapState, mapDispatch)(JobMatches)
