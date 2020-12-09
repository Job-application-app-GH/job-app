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
    console.log('matches-->', matches)
    return (
      <div>
        <OrgHeader />
        <h3>Your Matches</h3>

        {matches.length ? (
          matches.map((match) => (
            <div>
              <Link to={`/candidatematches/${match.candidate.id}`}>
                <h5>{match.candidate.name}</h5>
              </Link>
            </div>
          ))
        ) : (
          <h4>You do not have any matches yet!</h4>
        )}
        <button onClick={this.goBack}>Return to job details</button>
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
