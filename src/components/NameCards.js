import React from 'react'
import TinderCard from 'react-tinder-card'
import {fetchUser} from '../store/nameCard'
import {connect} from 'react-redux'
import ReactCardFlip from 'react-card-flip'


class NameCards extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isFlipped: false
    }
    this.handleClick=this.handleClick.bind(this)
  }


  componentDidMount() {
    this.props.getUser()
  }

  handleClick(e) {
    e.preventDefault();
    this.setState(state => ({ isFlipped: !this.state.isFlipped }));
  }
  
  render() {
  return (
    
    <div>
      <div className="cardsPile">
      {this.props.nameCard.map((user) => (
        <div>
          
          <TinderCard
            key={user.name}
            className="swipe"
            preventSwipe={['up', 'down']}
          >
          <ReactCardFlip 
          key={user.id} 
          isFlipped={this.state.isFlipped} 
          flipDirection="vertical" >

        <div className='card' 
        onClick={this.handleClick} 
        style={{backgroundColor: '#FFB6C1'}} >

        <h3>{user.name}</h3> 
        <h3>Current role: {user.currentRole}</h3>
        <h3>Works at: {user.currentCompany}</h3>
        <h3>FRONT OF THE CARD</h3>

        </div>
 
       
        <div className='card' 
               onClick={this.handleClick} 
                style={{backgroundColor: '#6495ED'}}>

               <h3>{user.name}</h3>
              <h3>About me: {user.description}</h3>
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
const mapState = state => ({
  nameCard: state.nameCard
})

const mapDispatch = dispatch => ({
  getUser: () => dispatch(fetchUser()),
})

export default connect(mapState, mapDispatch)(NameCards)

