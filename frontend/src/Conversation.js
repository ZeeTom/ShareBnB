import React, { useState, useEffect } from 'react';
import axios from "axios";
import Message from './Message'
const BASE_URL = "http://localhost:3001";

function Conversation() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function fetchMessages() {
      const resp = await axios.get(`${BASE_URL}/users/u1/messages/u2`);
      console.log(resp.data);
      setMessages(resp.data.messages);
    }
    fetchMessages();
  }, [])

  return (
    <div>
      {messages.length && messages.map(m => <Message text={m.text} fromUser={m.fromUser}/>)}
    </div>
  )
}

export default Conversation;