
import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [handle, setHandle] = useState('');
  const [status, setStatus] = useState('');

  const login = async () => {
    try {
      const res = await axios.post('http://localhost:3001/api/login', {
        identifier,
        password
      });
      setStatus('Logged in successfully');
    } catch {
      setStatus('Login failed');
    }
  };

  const followFollowers = async () => {
    try {
      const res = await axios.post('http://localhost:3001/api/follow-followers', {
        handle
      });
      setStatus(`Followed ${res.data.followed} users`);
    } catch (err) {
      setStatus('Failed to follow users');
    }
  };

  return (
    <div className="App">
      <h1>Bluesky Mass Follower</h1>
      <div>
        <input
          placeholder="Your Bluesky Handle"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        /><br/>
        <input
          type="password"
          placeholder="App Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br/>
        <button onClick={login}>Login</button>
      </div>
      <hr />
      <div>
        <input
          placeholder="Target User Handle"
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
        /><br/>
        <button onClick={followFollowers}>Follow All Followers</button>
      </div>
      <p>{status}</p>
    </div>
  );
}

export default App;
