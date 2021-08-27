import React, { useState, useEffect } from 'react';
import axios from "axios";
const BASE_URL = "http://localhost:3001";

function Inbox() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const resp = await axios.get(`${BASE_URL}/users/u1/messages`);
      console.log(resp.data);
      setUsers(resp.data.users);
    }
    fetchUsers();
  }, [])

  return (
    <ul className="Inbox">
      {users.length && users.map(u => <li>{u}</li>)}
    </ul>
  )
}

export default Inbox;