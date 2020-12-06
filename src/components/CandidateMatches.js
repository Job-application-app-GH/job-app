import React from 'react'
import TinderCard from 'react-tinder-card'
import {fetchSuggestedCandidates} from '../store/candidateMatches'
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
    this.props.getSuggestedCandidates()
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
      'Inside render of nameCards, total cards: ',
      this.props.suggestedCandidates.length
    )
    return (
      <div>
        <div className="cardsPile">
          {this.props.suggestedCandidates.map((candidate) => (
            <div>
              <TinderCard
                key={candidate.name}
                className="swipe"
                preventSwipe={['up', 'down']}
                onSwipe={this.onSwipe}
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
  getSuggestedCandidates: () => dispatch(fetchSuggestedCandidates()),
})

export default connect(mapState, mapDispatch)(CandidateMatches)
