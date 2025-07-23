# Bluesky Mass-Follow Web App

This tool allows you to log in to your Bluesky account (using an App Password) and mass-follow the followers of any public Bluesky user.

## Features

- Login with Bluesky handle + App Password
- Input a target user handle (e.g., `@someone.bsky.social`)
- Follow all their followers with a single click

---

## Local Development

### Backend (Express)

```bash
cd server
npm install
npm start
```

### Frontend (React)

```bash
cd client
npm install
npm start
```

Ensure the backend is running on port `3001`.

---

## Deployment

### Backend on Render

- Deploy the `server/` folder as a Web Service.
- Set environment variable:
  ```
  PORT=3001
  ```

### Frontend on Vercel

- Deploy the `client/` folder.
- Set env variable:
  ```
  REACT_APP_API_BASE=https://your-backend.onrender.com
  ```

Update `App.js` to use `REACT_APP_API_BASE` for API calls.

---

## Important

- You **must** use a [Bluesky App Password](https://bsky.social/settings/app-passwords), not your main login password.
- The app does not store credentials — all actions are in-session only.

---
MIT License
