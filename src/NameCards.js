import React, {useState} from 'react'
import TinderCard from 'react-tinder-card'



function NameCards() {
    const [cards, setCards] = useState([
        {
            name: 'Archana',
            url: 'https://ca.slack-edge.com/T024FPYBQ-U01AZA318E6-46c74a95e013-512'
        },
        {
            name: 'Mackenzie',
            url: 'https://ca.slack-edge.com/T024FPYBQ-U017W20F9D4-dd652129cf3c-512'
        },
        {
            name: 'Maria',
            url: 'https://ca.slack-edge.com/T024FPYBQ-U01AJHRCK2T-b11a13f36d63-512'
        }
    ]);

    return (
        <div>
            <div className='cardsPile'>
               {cards.map(user => (
                <TinderCard className='swipe' key={user.name} preventSwipe={['up','down']}>
                    <div style={{backgroundImage: `url(${user.url})`}} className='card'>
                      <h3>{user.name}</h3>
                    </div>
                </TinderCard>
            ))}

            </div>
            
        </div>
    )
}

export default NameCards
