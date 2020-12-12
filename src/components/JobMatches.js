import React from 'react'
import TinderCard from 'react-tinder-card'
import {
  fetchSuggestedJobs,
  sendJobMatch,
  resetLastJobMatch,
} from '../store/jobMatches'
import {fetchCandidate} from '../store/candidate'
import {connect} from 'react-redux'
import ReactCardFlip from 'react-card-flip'
import Header from './Header'
import Avatar from '@material-ui/core/Avatar'
import MatchNotification from './MatchNotification'

function getTop3Skills(skillSet) {
  let top3Skills = skillSet.slice(0, 3).join(' • ')
  return top3Skills
}

class JobMatches extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isFlipped: false,
    }
    this.handleTouchEnd = this.handleTouchEnd.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.onSwipe = this.onSwipe.bind(this)
    this.resetLastMatch = this.resetLastMatch.bind(this)
  }

  componentDidMount() {
    const candidateId = this.props.match.params.candidateId
    this.props.loadCandidate()
    this.props.getSuggestedJobs(candidateId)
  }

  handleTouchEnd(e) {
    e.preventDefault()
    this.setState((state) => ({isFlipped: !this.state.isFlipped}))
  }

  handleClick(e) {
    e.preventDefault()
    this.setState((state) => ({isFlipped: !this.state.isFlipped}))
  }

  onSwipe = (jobId, candidateId, direction) => {
    let isLiked
    switch (direction) {
      case 'left':
        isLiked = false
        this.props.sendJobMatch(jobId, candidateId, isLiked)
        break
      case 'right':
        isLiked = true
        this.props.sendJobMatch(jobId, candidateId, isLiked)
        break
      default:
        break
    }
  }

  resetLastMatch() {
    this.props.resetLastJobMatch()
  }

  render() {
    const candidateId = this.props.match.params.candidateId
    const lastMatch = this.props.lastMatch
    const linkToSearches = `/findJobs/${candidateId}`
    const linkToAllMatches = `/profile/candidate/matches/${candidateId}`
    const totalMatches = this.props.suggestedJobs.length

    return (
      <div className="global-screen-box">
        <Header stile={{color: 'white'}} />
        <div className="cardsPile">
          {lastMatch.isPerfectMatch && (
            <MatchNotification
              candidate={this.props.candidate}
              organization={lastMatch.matchedJob.organization}
              handleClose={this.resetLastMatch}
              linkToSearches={linkToSearches}
              linkToAllMatches={linkToAllMatches}
            />
          )}
          {!lastMatch.isPerfectMatch &&
            totalMatches &&
            this.props.suggestedJobs.map((job) => (
              <div key={job.id}>
                <TinderCard
                  className="swipe"
                  preventSwipe={['up', 'down']}
                  onSwipe={(direction) =>
                    this.onSwipe(job.id, candidateId, direction)
                  }
                >
                  <ReactCardFlip
                    key={job.id}
                    isFlipped={this.state.isFlipped}
                    flipDirection="vertical"
                  >
                    <div
                      className="card"
                      onTouchEnd={this.handleTouchEnd}
                      onClick={this.handleClick}
                      style={{backgroundColor: 'seashell'}}
                    >
                      {/* THIS IS FRONT SIDE OF THE CARD */}
                      <Avatar className="chat_avatar" src={job.orgImg} />
                      <h2>{job.title}</h2>
                      <h3>@ {job.orgName}</h3>
                      <h3>
                        Role posted: <h4>{job.description}</h4>{' '}
                      </h3>
                      <h2>Required Skills: </h2>
                      <h4>{getTop3Skills(job.skills)}</h4>
                    </div>

                    <div
                      className="card"
                      onClick={this.handleClick}
                      onTouchEnd={this.handleTouchEnd}
                      style={{backgroundColor: 'seashell'}}
                    >
                      {/* THIS IS BACK SIDE OF THE CARD */}
                      <h2>{job.title}</h2>
                      <h3>Where: {job.location}</h3>
                      <h3>About {job.orgName}:</h3>
                      <h3>{job.orgDescription}</h3>
                      <h2> Preferred Skills: </h2>
                      <div className="card-skill-box">
                        {job.skills.map((skill, index) => (
                          <div key={index}>{skill}</div>
                        ))}
                      </div>
                    </div>
                  </ReactCardFlip>
                </TinderCard>
              </div>
            ))}
          {!lastMatch.isPerfectMatch && !totalMatches && (
            <div>
              <h2>Come back later for more Matches </h2>
            </div>
          )}
        </div>
      </div>
    )
  }
}
const mapState = (state) => ({
  candidate: state.candidate,
  suggestedJobs: state.suggestedJobs.list,
  lastMatch: state.suggestedJobs.lastMatch,
})

const mapDispatch = (dispatch) => ({
  loadCandidate: () => dispatch(fetchCandidate()),
  getSuggestedJobs: (candidateId) => dispatch(fetchSuggestedJobs(candidateId)),
  sendJobMatch: (jobId, candidateId, isLiked) =>
    dispatch(sendJobMatch(jobId, candidateId, isLiked)),
  resetLastJobMatch: () => dispatch(resetLastJobMatch()),
})

export default connect(mapState, mapDispatch)(JobMatches)
