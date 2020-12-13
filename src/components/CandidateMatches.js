import React from 'react'
import TinderCard from 'react-tinder-card'
import {
  fetchSuggestedCandidates,
  sendCandidateMatch,
  resetLastCandidateMatch,
} from '../store/candidateMatches'
import {connect} from 'react-redux'
import ReactCardFlip from 'react-card-flip'
import OrgHeader from './OrgHeader'
import Avatar from '@material-ui/core/Avatar'
import MatchNotification from './MatchNotification'

function getTop3Skills(skillSet) {
  let top3Skills = skillSet.slice(0, 3).join(' • ')
  return top3Skills
}

class CandidateMatches extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      isFlipped: false,
    }
    this.handleTouchEnd = this.handleTouchEnd.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.onSwipe = this.onSwipe.bind(this)
    this.resetLastMatch = this.resetLastMatch.bind(this)
  }

  async componentDidMount() {
    const jobId = this.props.match.params.jobId
    await this.props.getSuggestedCandidates(jobId)
    this.setState({isLoading: false})
  }

  handleTouchEnd(e) {
    e.preventDefault()
    this.setState((state) => ({isFlipped: !this.state.isFlipped}))
  }

  handleClick(e) {
    e.preventDefault()
    this.setState((state) => ({isFlipped: !this.state.isFlipped}))
  }

  onSwipe(jobId, candidateId, direction) {
    let isLiked
    switch (direction) {
      case 'left':
        isLiked = false
        this.props.sendCandidateMatch(jobId, candidateId, isLiked)
        break
      case 'right':
        isLiked = true
        this.props.sendCandidateMatch(jobId, candidateId, isLiked)
        break
      default:
        break
    }
  }

  resetLastMatch() {
    this.props.resetLastCandidateMatch()
  }

  render() {
    if (this.state.isLoading) {
      console.log('Is loading ? : ', this.state.isLoading)
      return (
        <div className="global-screen-box">
          <OrgHeader />
          <div>
            <h2 style={{color: 'white', marginTop: '200px'}}>
              Loading matches ....{' '}
            </h2>
          </div>
        </div>
      )
    }
    const jobId = this.props.match.params.jobId
    const lastMatch = this.props.lastMatch
    const linkToSearches = `/findCandidates/${jobId}`
    const linkToAllMatches = `/profile/jobs/matches/${jobId}`
    const totalMatches = this.props.suggestedCandidates.length
    return (
      <div className="global-screen-box">
        <OrgHeader />
        <div className="cardsPile" style={{color: '#ffc654'}}>
          {lastMatch.isPerfectMatch && (
            <MatchNotification
              candidate={lastMatch.matchedCandidate}
              organization={this.props.organization}
              handleClose={this.resetLastMatch}
              linkToSearches={linkToSearches}
              linkToAllMatches={linkToAllMatches}
            />
          )}
          {!lastMatch.isPerfectMatch &&
            totalMatches &&
            this.props.suggestedCandidates.map((candidate) => (
              <div key={candidate.name}>
                <TinderCard
                  className="swipe"
                  preventSwipe={['up', 'down']}
                  onSwipe={(direction) =>
                    this.onSwipe(jobId, candidate.id, direction)
                  }
                >
                  <ReactCardFlip
                    key={candidate.id}
                    isFlipped={this.state.isFlipped}
                    flipDirection="vertical"
                  >
                    <div
                      key={candidate.id}
                      className="card"
                      style={{backgroundColor: 'seashell'}}
                    >
                      {/* THIS IS FRONT SIDE OF THE CARD */}
                      <Avatar className="chat_avatar" src={candidate.img} />
                      <h2>{candidate.name}</h2>
                      <h3>Current role: {candidate.currentRole}</h3>
                      <h3>Works at: {candidate.currentCompany}</h3>
                      <h2> Skills:</h2>
                      <h4>{getTop3Skills(candidate.skills)}</h4>
                      <h2
                        onClick={this.handleClick}
                        onTouchEnd={this.handleTouchEnd}
                      >
                        View details
                      </h2>
                    </div>

                    <div
                      key={candidate.id}
                      className="card"
                      style={{backgroundColor: 'seashell'}}
                    >
                      {/* THIS IS BACK SIDE OF THE CARD */}
                      <h2>{candidate.name}</h2>
                      <h3>Location: {candidate.location}</h3>
                      <h3>About me: {candidate.description}</h3>
                      <h2> Skills: </h2>
                      {candidate.skills.map((skill, index) => (
                        <div key={index}>{skill}</div>
                      ))}
                      <h2
                        onClick={this.handleClick}
                        onTouchEnd={this.handleTouchEnd}
                      >
                        Flip back
                      </h2>
                    </div>
                  </ReactCardFlip>
                </TinderCard>
              </div>
            ))}
          {!lastMatch.isPerfectMatch && !totalMatches && (
            <div className="out-of-cards" style={{backgroundColor: 'seashell'}}>
              <h2>Come back later for more Matches </h2>
            </div>
          )}
        </div>
      </div>
    )
  }
}
const mapState = (state) => ({
  organization: state.organization,
  suggestedCandidates: state.suggestedCandidates.list,
  lastMatch: state.suggestedCandidates.lastMatch,
})

const mapDispatch = (dispatch) => ({
  getSuggestedCandidates: (jobId) => dispatch(fetchSuggestedCandidates(jobId)),
  sendCandidateMatch: (jobId, candidateId, isLiked) =>
    dispatch(sendCandidateMatch(jobId, candidateId, isLiked)),
  resetLastCandidateMatch: () => dispatch(resetLastCandidateMatch()),
})

export default connect(mapState, mapDispatch)(CandidateMatches)
