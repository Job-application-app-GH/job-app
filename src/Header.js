import React, { Component } from 'react'
import './App.css'
import {Link} from 'react-router-dom'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ChatIcon from '@material-ui/icons/Chat'

export default class Header extends Component {
    render() {
        return (
            <div className='header'>
                <AccountCircleIcon className='icons' fontSize='large'/>  
                <Link to='/'>
                <LinkedInIcon className='icons' fontSize='large'/>
                </Link>
                <Link to = '/chat'>
                <ChatIcon className='icons' fontSize='large'  />
                </Link>
            </div>
        )
    }
}
