import React from 'react'
import TinderCard from 'react-tinder-card'
import {fetchSuggestedJobs} from '../store/jobMatches'//MARIA: revisit thunk with Archana
import {connect} from 'react-redux'
import ReactCardFlip from 'react-card-flip'

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
    this.props.getSuggestedJobs()
  }

  handleClick(e) {
    e.preventDefault()
    this.setState((state) => ({isFlipped: !this.state.isFlipped}))
  }

  onSwipe = (direction) => {
    console.log('You swiped: ' + direction)
  }

  render() {
    console.log(
      'Inside render of JobMatches, total cards: ',
      this.props.suggestedJobs.length
    )
    
    //MARIA: render changed to cater jobs
    return (
      <div>
        <div className="cardsPile">
        {this.props.suggestedJobs.map((job) => (
            <div>
              <TinderCard
                key={job.name}
                className="swipe"
                preventSwipe={['up', 'down']}
                onSwipe={this.onSwipe}
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
                    <h3>{job.name}</h3>
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
  getSuggestedJobs: () => dispatch(fetchSuggestedJobs()),
})

export default connect(mapState, mapDispatch)(JobMatches)
