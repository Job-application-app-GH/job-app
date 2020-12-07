import React from 'react'
import {fetchJobMatches} from '../store/profileMatches'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class JobMatches extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.loadMatches(this.props.match.params.id)
  }

  render() {
    const matches = this.props.profileMatches
    console.log('matches-->', matches)
    return (
      <div>
        <h3>Your Matches</h3>

        {matches ? (
          matches.map((match) => (
            <div>
              <Link to={`/matches/${match.candidate.id}`}>
                <h5>{match.candidate.name}</h5>
              </Link>
            </div>
          ))
        ) : (
          <h3>You do not have any matches yet!</h3>
        )}
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
