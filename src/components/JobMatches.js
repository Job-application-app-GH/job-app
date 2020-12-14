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
      isLoading: true,
      isFlipped: false,
    }
    this.handleTouchEnd = this.handleTouchEnd.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.onSwipe = this.onSwipe.bind(this)
    this.resetLastMatch = this.resetLastMatch.bind(this)
  }

  async componentDidMount() {
    const candidateId = this.props.match.params.candidateId
    this.props.loadCandidate()
    await this.props.getSuggestedJobs(candidateId)
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
    //If matches are loading, just return "Loading" message on screen.
    if (this.state.isLoading) {
      return (
        <div className="global-screen-box">
          <Header style={{color: 'white'}} />
          <div>
            <h2 style={{color: 'white', marginTop: '200px'}}>
              Loading matches ....{' '}
            </h2>
          </div>
        </div>
      )
    }
    const candidateId = this.props.match.params.candidateId
    const lastMatch = this.props.lastMatch
    const linkToSearches = `/findJobs/${candidateId}`
    const linkToAllMatches = `/profile/candidate/matches/${candidateId}`
    const totalMatches = this.props.suggestedJobs.length

    return (
      <div className="global-screen-box">
        <Header style={{color: 'white'}} />
        <div className="cardsPile" style={{color: '#ffc654'}}>
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
                      
                      style={{backgroundColor: 'seashell'}}
                    >
                      {/* THIS IS FRONT SIDE OF THE CARD */}
                      <Avatar className="chat_avatar" src={job.orgImg} />
                      <h2>{job.title}</h2>
                      <h3>@ {job.orgName}</h3>

                      <div className="card-detail-box-front">
                        <h3>
                          Description:
                          <h4>{job.description}</h4>{' '}
                        </h3>
                        <h3>Required Skills: </h3>
                        <h4>{getTop3Skills(job.skills)}</h4>
                      </div>

                    <h2  onClick={this.handleClick} onTouchEnd={this.handleTouchEnd}>View details</h2>


                    </div>

                    <div
                      className="card"

                      style={{backgroundColor: 'seashell'}}
                    >
                      {/* THIS IS BACK SIDE OF THE CARD */}
                      <h2>{job.title}</h2>
                      <h3>Where: {job.location}</h3>
                      <div className="card-detail-box-back">
                        <h3>About {job.orgName}:</h3>
                        <h3>{job.orgDescription}</h3>

                        <h2> Preferred Skills: </h2>

                        {job.skills.map((skill, index) => (
                          <div key={index}>{skill}</div>
                        ))}
                      </div>

                      <h2  onClick={this.handleClick} onTouchEnd={this.handleTouchEnd}>Flip back</h2>

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
