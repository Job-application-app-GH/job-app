import React from 'react'
import {fetchJobMatches} from '../store/profileMatches'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import OrgHeader from './OrgHeader'

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
        <OrgHeader />

        <div className="org-profile-matches-container">
          <h2 style={{color: 'white'}}>Your Matches</h2>
          {matches.length ? (
            matches.map((match) => (
              <div className="job-profile-card">
                <Link to={`/candidatematches/${match.candidate.id}`}>
                  <h3>{match.candidate.name}</h3>
                </Link>
              </div>
            ))
          ) : (
            <h2 style={{color: 'white'}}>You do not have any matches yet!</h2>
          )}
          <button className="match-button" onClick={this.goBack}>
            BACK
          </button>
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
    loadMatches: (id) => dispatch(fetchJobMatches(id)),
  }
}

export default connect(mapState, mapDispatch)(JobMatches)
