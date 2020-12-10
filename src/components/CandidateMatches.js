import React from 'react'
import TinderCard from 'react-tinder-card'
import {
  fetchSuggestedCandidates,
  sendCandidateMatch,
} from '../store/candidateMatches'
import {connect} from 'react-redux'
import ReactCardFlip from 'react-card-flip'
import OrgHeader from './OrgHeader'
import Avatar from '@material-ui/core/Avatar'

function getTop3Skills(skillSet) {
  let top3Skills = skillSet.slice(0, 3).join(',')
  // console.log('tope3Skills: ', top3Skills)
  return top3Skills
}

class CandidateMatches extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isFlipped: false,
    }
    this.handleTouchStart = this.handleTouchStart.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.onSwipe = this.onSwipe.bind(this)
  }

  componentDidMount() {
    const jobId = this.props.match.params.jobId
    this.props.getSuggestedCandidates(jobId)
  }

  handleTouchStart(e) {
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
    // console.log(
    //   'Inside render of CandidateMatches, total cards: ',
    //   this.props.suggestedCandidates.length
    // )

    const jobId = this.props.match.params.jobId
    return (
      <div>
        <OrgHeader />
        <div className="cardsPile">
          {this.props.suggestedCandidates.map((candidate) => (
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
                    onClick={this.handleClick}
                    onTouchStart={this.handleTouchStart}
                    style={{backgroundColor: 'seashell'}}
                  >
                    {/* THIS IS FRONT SIDE OF THE CARD */}
                    <Avatar className="chat_avatar" src={candidate.img} />
                    <h3>{candidate.name}</h3>
                    <h3>Current role: {candidate.currentRole}</h3>
                    <h3>Works at: {candidate.currentCompany}</h3>
                    <h3> Skills:</h3>
                    <h3>{getTop3Skills(candidate.skills)}</h3>
                  </div>

                  <div
                    key={candidate.id}
                    className="card"
                    onClick={this.handleClick}
                    onTouchStart={this.handleTouchStart}
                    style={{backgroundColor: 'seashell'}}
                  >
                    {/* THIS IS BACK SIDE OF THE CARD */}
                    <h3>{candidate.name}</h3>
                    <h3>Location: {candidate.location}</h3>
                    <h3>About me: {candidate.description}</h3>
                    <h3> Skills: </h3>
                    {candidate.skills.map((skill, index) => (
                      <div key={index}>{skill}</div>
                    ))}
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
