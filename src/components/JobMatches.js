import React from 'react'
import TinderCard from 'react-tinder-card'
import {fetchSuggestedJobs, sendJobMatch} from '../store/jobMatches'
import {connect} from 'react-redux'
import ReactCardFlip from 'react-card-flip'
import Header from './Header'

class JobMatches extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isFlipped: false,
    }
    this.handleClick = this.handleClick.bind(this)
    this.onSwipe = this.onSwipe.bind(this)
  }

  componentDidMount() {
    const candidateId = this.props.match.params.candidateId
    this.props.getSuggestedJobs(candidateId)
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
        this.props.sendJobMatch(jobId, candidateId, isLiked)
        break
      case 'right':
        console.log('You swiped: ' + direction)
        isLiked = true
        this.props.sendJobMatch(jobId, candidateId, isLiked)
        break
      default:
        break
    }
  }

  render() {
    // console.log(
    //   'Inside render of JobMatches, total cards: ',
    //   this.props.suggestedJobs.length
    // )

    const candidateId = this.props.match.params.candidateId
    return (
      <div>
        <Header />
        <div className="cardsPile">
          {this.props.suggestedJobs.map((job) => (
            <div key={job.id}>
              <TinderCard
                key={job.id}
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
                    onClick={this.handleClick}
                    style={{backgroundColor: '#FFB6C1'}}
                  >
                    <h3>{job.title}</h3>
                    <h3>Current role: {job.description}</h3>
                    <h3>Works at: {job.location}</h3>
                    <h3>FRONT OF THE CARD</h3>
                  </div>

                  <div
                    className="card"
                    onClick={this.handleClick}
                    style={{backgroundColor: '#6495ED'}}
                  >
                    <h3>{job.title}</h3>
                    <h3>About me: {job.description}</h3>
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
  suggestedJobs: state.suggestedJobs,
})

const mapDispatch = (dispatch) => ({
  getSuggestedJobs: (candidateId) => dispatch(fetchSuggestedJobs(candidateId)),
  sendJobMatch: (jobId, candidateId, isLiked) =>
    dispatch(sendJobMatch(jobId, candidateId, isLiked)),
})

export default connect(mapState, mapDispatch)(JobMatches)
