import React, {useState} from 'react'
import TinderCard from 'react-tinder-card'
import {fetchUser} from '../store/nameCard'
import {connect} from 'react-redux'

class NameCards extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      flip: false
    }
    this.handleClick=this.handleClick.bind(this)
  }


  componentDidMount() {
    this.props.getUser()
  }

  handleClick() {
    this.setState({flip: !this.state.flip})
  }
  render() {   const {flip} = this.state.flip
  return (
 
    <div>
      <div className="cardsPile">
      {this.props.nameCard.map((user) => (
        <div>
          <TinderCard
            className="swipe"
            key={user.name}
            preventSwipe={['up', 'down']}
          >
            <div style={flip ? {backgroundImage: `url(${user.flipUrl})`} : {backgroundImage: `url(${user.url})`}} 
            className={`card ${flip ? 'flip' : ''}`} 
            onClick={this.handleClick}>

              <h3>{flip ? 
              <div className='cardBack'>
              <h3>{user.name}</h3>
              <h3>{user.title}</h3>
              <h3>Works at: {user.currCompany}</h3>
              <h3>{user.about}</h3>

              </div>
               : 
               <div className='cardFront'>{user.name}</div>}</h3>
            </div>
          </TinderCard>
          </div>
        ))}
      </div>
    </div>
  )
}
}
const mapState = state => ({
  nameCard: state.nameCard
})

const mapDispatch = dispatch => ({
  getUser: () => dispatch(fetchUser()),
})

export default connect(mapState, mapDispatch)(NameCards)

