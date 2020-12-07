import React from 'react'
import TinderCard from 'react-tinder-card'
import {
  fetchSuggestedCandidates,
  sendCandidateMatch,
} from '../store/candidateMatches'
import {connect} from 'react-redux'
import ReactCardFlip from 'react-card-flip'

class CandidateMatches extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isFlipped: false,
    }
    this.handleClick = this.handleClick.bind(this)
    this.onSwipe = this.onSwipe.bind(this)
  }

  componentDidMount() {
    //ARCHANA: WHERE ARE WE GETTING THE JOBID FROM ????
    const jobId = 1
    this.props.getSuggestedCandidates(jobId)
  }

  handleClick(e) {
    e.preventDefault()
    this.setState((state) => ({isFlipped: !this.state.isFlipped}))
  }

  onSwipe = (jobId, candidateId, direction) => {
    // console.log('jobId, candidateId===>', jobId, candidateId)
    let isLiked
    switch (direction) {
      case 'left':
        console.log('You swiped: ' + direction)
        isLiked = false
        this.props.sendCandidateMatch(jobId, candidateId, isLiked)
        break
      case 'right':
        console.log('You swiped: ' + direction)
        isLiked = true
        this.props.sendCandidateMatch(jobId, candidateId, isLiked)
        break
      default:
        break
    }
  }

  render() {
    console.log(
      'Inside render of CandidateMatches, total cards: ',
      this.props.suggestedCandidates.length
    )
    //ARCHANA: WHERE ARE WE GETTING THE JOBID FROM ????
    const jobId = 1

    return (
      <div>
        <div className="cardsPile">
          {this.props.suggestedCandidates.map((candidate) => (
            <div>
              <TinderCard
                key={candidate.name}
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
                    className="card"
                    onClick={this.handleClick}
                    style={{backgroundColor: '#FFB6C1'}}
                  >
                    <h3>{candidate.name}</h3>
                    <h3>Current role: {candidate.currentRole}</h3>
                    <h3>Works at: {candidate.currentCompany}</h3>
                    <h3>FRONT OF THE CARD</h3>
                  </div>

                  <div
                    className="card"
                    onClick={this.handleClick}
                    style={{backgroundColor: '#6495ED'}}
                  >
                    <h3>{candidate.name}</h3>
                    <h3>About me: {candidate.description}</h3>
                    <h3>BACK OF THE CARD</h3>
                  </div>
                </ReactCardFlip>
              </TinderCard>
            </div>
          ))}
        </div>
      </div>
    )
  }
}
const mapState = (state) => ({
  suggestedCandidates: state.suggestedCandidates,
})

const mapDispatch = (dispatch) => ({
  getSuggestedCandidates: (jobId) => dispatch(fetchSuggestedCandidates(jobId)),
  sendCandidateMatch: (jobId, candidateId, isLiked) =>
    dispatch(sendCandidateMatch(jobId, candidateId, isLiked)),
})

export default connect(mapState, mapDispatch)(CandidateMatches)
