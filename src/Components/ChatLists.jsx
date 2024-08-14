import React from 'react'
import '../styles/ChatLists.css'

export default function ChatLists({ chats }) { // Destructure chats from props
    const user = localStorage.getItem('user')
    
    function SenderChat ({message, userName, avatar}) {
        return (
            <div className='chat_sender'>
                <img src={avatar} alt='' className='chat_sender_img' />
                <p>
                    <strong>{userName}</strong> <br />
                    {message}
                </p>
            </div>
        )
    }

    function ReceiverChat ({message, userName, avatar}) {
        return (
            <div className='chat_receiver'>
                <img src={avatar} alt='' className='chat_receiver_img' />
                <p>
                    <strong>{userName}</strong> <br />
                    {message}
                </p>
            </div>
        )
    }

    return (
        <div className='chats_list'>
            {
                chats.map((chat, index) => {
                    if (chat.user === user) {
                        return <SenderChat 
                            key={index}
                            message={chat.message}
                            userName={chat.user}
                            avatar={chat.avatar}
                        />
                    } else {
                        return <ReceiverChat 
                            key={index}
                            message={chat.message}
                            userName={chat.user}
                            avatar={chat.avatar}
                        />
                    }
                })
                
            }
            
        </div>
    )
    
}
