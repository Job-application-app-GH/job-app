import React from 'react'
import PostAddIcon from '@material-ui/icons/PostAdd';
import HomeIcon from '@material-ui/icons/Home';
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
import WorkIcon from '@material-ui/icons/Work';
import IconButton from '@material-ui/core/IconButton'


function FooterButtons() {
    return (
        <div className='footer'>
        <IconButton>
            <HomeIcon className='footer_icons' fontSize='large'/> 
        </IconButton>
        <IconButton>
            <NotificationImportantIcon className='footer_icons' fontSize='large'/>
        </IconButton>
        <IconButton>
            <PostAddIcon className='footer_icons' fontSize='large'/>
        </IconButton>
        <IconButton>
             <WorkIcon className='footer_icons' fontSize='large'/>
        </IconButton>  
        </div>
    )
}

export default FooterButtons

