import React, { useEffect, useState } from 'react'
import { FaYoutube } from 'react-icons/fa6'
import '../styles/ChatContainer.css'
import ChatLists from './ChatLists'
import InputText from './InputText'
import UserLogin from './UserLogin'
import socketIOClient from 'socket.io-client'

export default function ChatContainer() {
    const [user, setUser] = useState(localStorage.getItem('user'));
    const socketio = socketIOClient('http://localhost:3002'); 

    const [chats, setChats] = useState([]);

    useEffect(() => {
        socketio.on('chat', (newChat) => {
            setChats(prevChats => [...prevChats, newChat]);
        });

        return () => socketio.disconnect(); // Clean up on unmount
    }, []);

    const sendToSocket = (chat) => {
        socketio.emit('chat', chat);
    };

    const addMessage = (chat) => {
        const newChat = { 
            ...chat, 
            user: localStorage.getItem('user'), 
            avatar: localStorage.getItem('avatar'),
        };
        setChats(prevChats => [...prevChats, newChat]);
        sendToSocket(newChat);
    };

    const Logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("avatar");
        setUser('');
    };

    return (
        <div>
            {user ? (
                <div>
                    <div className='chats-header'>
                        <h4>UserName: {user}</h4>
                        <p>
                            <FaYoutube className='chats_icon'/> Code with {user}
                        </p>
                        <p className='chats_logout' onClick={Logout}>
                            <strong>Logout</strong>
                        </p>
                    </div>
                    <ChatLists chats={chats}/>
                    <InputText addMessage={addMessage}/>
                </div>
            ) : (
                <UserLogin setUser={setUser}/>
            )}
        </div>
    )
}
