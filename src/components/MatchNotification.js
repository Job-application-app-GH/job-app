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

  return (

    <div className="match-card" style={{backgroundColor: 'seashell'}}>
      <h2 style={{color: '#e09808'}}>It's a Match! </h2>
      <div className='match-imgs'>
      <h3> {candidate.name}</h3>
      <img src={candidate.img} className="match-img" alt="" />
      <h3> {organization.name}</h3>
      <img src={organization.img} className="match-img" alt="" />
      <div />
      </div>
      <div className='match-buttons'>
      <Link to={linkToSearches}>
        <button onClick={handleClose} className="match-button">
          {' '}
          KEEP SWIPING{' '}
        </button>
      </Link>
      <Link to={linkToAllMatches}>
        <button onClick={handleClose} className="match-button">
          {' '}
          VIEW MATCHES{' '}
        </button>
      </Link>
      </div>
      {/* </div> */}
    </div> 

 
  )
}

export default MatchNotification
