import React, {useState} from 'react'
import TinderCard from 'react-tinder-card'

function NameCards() {
  const [flip,setFlip] = useState(false)
  const [cards, setCards] = useState([
    {
      name: 'Archana',
      title: 'Software Engineer',
      about: 'Hey there! Here you would be able to see my "About me" paragraph',
      url: 'https://ca.slack-edge.com/T024FPYBQ-U01AZA318E6-46c74a95e013-512',
      flipUrl: 'https://sherwin.scene7.com/is/image/sw/color-swatch?_tparam_size=250,250&layer=comp&_tparam_color=C6CACA'
    },
    {
      name: 'Mackenzie',
      title: 'Software Engineer',
      about: 'Hey there! Here you would be able to see my "About me" paragraph',
      url: 'https://ca.slack-edge.com/T024FPYBQ-U017W20F9D4-dd652129cf3c-512',
      flipUrl: 'https://sherwin.scene7.com/is/image/sw/color-swatch?_tparam_size=250,250&layer=comp&_tparam_color=C6CACA'
    },
    {
      name: 'Maria Chumachkova',
      title: 'Software Engineer',
      currCompany: 'Google',
      about: 'Passionate coder, loves good challenges, bubbly company spirit and mac & cheese',
      url: 'https://ca.slack-edge.com/T024FPYBQ-U01AJHRCK2T-b11a13f36d63-512',
      flipUrl: 'https://sherwin.scene7.com/is/image/sw/color-swatch?_tparam_size=250,250&layer=comp&_tparam_color=C6CACA'
    },
  ])

  return (
    <div>
      <div className="cardsPile">
        {cards.map((user) => (
          <TinderCard
            className="swipe"
            key={user.name}
            preventSwipe={['up', 'down']}
          >
            <div style={flip ? {backgroundImage: `url(${user.flipUrl})`} : {backgroundImage: `url(${user.url})`}} 
            className={`card ${flip ? 'flip' : ''}`} 
            onClick={() => setFlip(!flip)}>

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
        ))}
      </div>
    </div>
  )
}

const SAMPLE_INFO = [
  {
      id: 2,
      name: 'Maria Chumachkova',
      title: 'Software Engineer',
      about: 'Hey there! Here you would be able to see my about paragraph',

  },
  {
     id: 2,
     name: 'Mackenzie',
     title: 'Software Engineer',
     about: 'Hey there! Here you would be able to see my about paragraph',
     
 },
 {
     id: 2,
     name: 'Archana',
     title: 'Software Engineer',
     about: 'Hey there! Here you would be able to see my about paragraph',
     
 }
]


export default NameCards
