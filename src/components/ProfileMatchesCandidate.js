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
      <div>
        <Header />
        <h3>Your Matches</h3>

        {matches.length ? (
          matches.map((match) => (
            <div>
              <Link to={`/jobmatches/${match.job.id}`}>
                <h5>{match.job.title}</h5>
              </Link>
            </div>
          ))
        ) : (
          <h4>You do not have any matches yet!</h4>
        )}
        {/* <button onClick={this.goBack}>Return to profile</button> */}
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
