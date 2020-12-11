import React from 'react'
import TinderCard from 'react-tinder-card'
import {fetchSuggestedJobs, sendJobMatch} from '../store/jobMatches'
import {connect} from 'react-redux'
import ReactCardFlip from 'react-card-flip'
import Header from './Header'
import Avatar from '@material-ui/core/Avatar'

function getTop3Skills(skillSet) {
  let top3Skills = skillSet.slice(0, 3).join(',')
  // console.log('tope3Skills: ', top3Skills)
  return top3Skills
}

class JobMatches extends React.Component {
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
    const candidateId = this.props.match.params.candidateId
    this.props.getSuggestedJobs(candidateId)
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
                    onTouchStart={this.handleTouchStart}
                    onClick={this.handleClick}
                    style={{backgroundColor: '#FFB6C1'}}
                  >
                    {/* THIS IS FRONT SIDE OF THE CARD */}
                    <Avatar className="chat_avatar" src={job.orgImg} />
                    <h3>{job.title}</h3>
                    <h3>@ {job.orgName}</h3>
                    <h3>Role: {job.description}</h3>
                    <h3>Required Skills: </h3>
                    <h3>{getTop3Skills(job.skills)}</h3>
                  </div>

                  <div
                    className="card"
                    onClick={this.handleClick}
                    onTouchStart={this.handleTouchStart}
                    style={{backgroundColor: '#6495ED'}}
                  >
                    {/* THIS IS BACK SIDE OF THE CARD */}
                    <h3>{job.title}</h3>
                    <h3>Location: {job.location}</h3>
                    <h3>About {job.orgName}:</h3>
                    <h3>{job.orgDescription}</h3>
                    <h3> Desired Skills: </h3>
                    {job.skills.map((skill, index) => (
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
  suggestedJobs: state.suggestedJobs,
})

const mapDispatch = (dispatch) => ({
  getSuggestedJobs: (candidateId) => dispatch(fetchSuggestedJobs(candidateId)),
  sendJobMatch: (jobId, candidateId, isLiked) =>
    dispatch(sendJobMatch(jobId, candidateId, isLiked)),
})

export default connect(mapState, mapDispatch)(JobMatches)
