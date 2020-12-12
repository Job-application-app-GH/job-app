import React from 'react'
import {Link} from 'react-router-dom'

function MatchNotification(props) {
  const {
    candidate,
    organization,
    handleClose,
    linkToSearches,
    linkToAllMatches,
  } = props
  console.log('Inside MatchNotification')
  console.log('linkToMatches: ', linkToSearches)
  return (
    <div className="card" style={{backgroundColor: 'seashell'}}>
      <h2>It's a Match! </h2>
      <h3> {candidate.name}</h3>
      <img src={candidate.img} className="match-img" alt="" />
      <h2> Matched With </h2>
      <h3> {organization.name}</h3>
      <img src={organization.img} className="match-img" alt="" />
      <div />
      <Link to={linkToSearches}>
        <button onClick={handleClose} className="match-button">
          {' '}
          Back to Searching{' '}
        </button>
      </Link>
      <Link to={linkToAllMatches}>
        <button onClick={handleClose} className="match-button">
          {' '}
          Show All Matches{' '}
        </button>
      </Link>
      {/* </div> */}
    </div>
  )
}

export default MatchNotification
