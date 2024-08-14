import React, { useState } from 'react'
import '../styles/InputText.css'

export default function InputText({ addMessage }) { // Destructure addMessage from props
  const [message, setMessage] = useState('')
  
  const sendMessage = () => {
    if (message.trim()) {
      addMessage({ message });
      setMessage("");
    }
  }
  
  return (
    <div className='inputtext_container'>
      <textarea 
        name='message' 
        id='message' 
        rows='6' 
        placeholder='Input message.....'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <button onClick={sendMessage}>Send</button>
    </div>
  )
}
