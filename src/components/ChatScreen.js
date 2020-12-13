import React, {useState} from 'react'
import { Avatar } from '@material-ui/core'
import Header from './Header'


// WIP


function ChatScreen() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        {
            name: 'Google',
            image: 'https://news.blr.com/app/uploads/sites/3/2019/05/Recruiter.jpg',
            message: 'Hello Archana, your resume looks like a great fit for us! Would you be available for a quick Zoom chat tomorrow?'
        },
        {
            message: 'Good morning!'
        },
        
        
    ])

    const handleSend = e => {
        e.preventDefault();
        setMessages([...messages, {message: input}])
        setInput('')
    }


    return (
        <div className='chatScreen'>
            <Header/>
            <p className='chatscreen-timestamp'>YOU MATCHED WITH GOOGLE ON 12/03/2020</p>
            {messages.map((message) => (
                message.name ? (
                 <div className='chatscreen-message' key={message.name}>
                <Avatar
                alt={message.name}
                src={message.image}
                />
                <p className='chatscreen-text'>
                {message.message}
                </p>

                </div>   
                ):(
                    <div className='chatscreen-message'>
                    <p className='chatscreen-text-user'>
                {message.message}
                </p>
                </div>
                )
            ))}
            <div >
                <form className='chatscreen-input-container'>
                    <input 
                    className='chatscreen-input-field' 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)}
                    placeholder = 'Type here ..' 
                    type='text'
                    >

                    </input>
                    <button className='chatscreen-input-button' onClick={handleSend} type='submit'>SEND</button>
                </form>
            </div>
        </div>
    )
}

export default ChatScreen

