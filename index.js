
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { BskyAgent } = require('@atproto/api');

const app = express();
app.use(cors());
app.use(express.json());

let agent;

app.post('/api/login', async (req, res) => {
  const { identifier, password } = req.body;
  agent = new BskyAgent({ service: 'https://bsky.social' });

  try {
    await agent.login({ identifier, password });
    res.json({ success: true });
  } catch (err) {
    res.status(401).json({ error: 'Login failed', details: err.message });
  }
});

app.post('/api/follow-followers', async (req, res) => {
  const { handle } = req.body;

  try {
    const targetProfile = await agent.resolveHandle({ handle });
    const targetDid = targetProfile.data.did;

    const followers = [];
    let cursor;
    do {
      const response = await agent.app.bsky.graph.getFollowers({
        actor: targetDid,
        cursor,
        limit: 100,
      });
      followers.push(...response.data.followers);
      cursor = response.data.cursor;
    } while (cursor);

    for (const follower of followers) {
      await agent.follow(follower.did);
    }

    res.json({ followed: followers.length });
  } catch (err) {
    res.status(500).json({ error: 'Failed to follow followers', details: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
