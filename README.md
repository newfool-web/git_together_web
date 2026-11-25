# GitTogether Web

GitTogether is a developer networking and collaboration platform. It helps developers discover people with similar interests, send or receive connection requests, manage their developer profile, and chat with accepted connections.

**Live app:** https://git-together-theta.vercel.app

> **Backend repository:** This frontend is a separate repository. GitTogether's API and real-time server live in [git_together](https://github.com/newfool-web/git_together). The frontend and backend must be run together for authentication, feeds, connections, and chat to work.

## Features

- Developer registration and login
- Public landing page
- Developer discovery feed
- Send interested or ignored responses to developers
- Accept or reject incoming connection requests
- View all accepted connections
- Create and edit a developer profile
- Real-time chat with connections using Socket.IO
- Responsive UI styled with Tailwind CSS and DaisyUI

## Tech Stack

- React 19
- Vite 7
- React Router
- Redux Toolkit and React Redux
- Axios
- Socket.IO Client
- Tailwind CSS 4
- DaisyUI
- ESLint

## Project Structure

```text
src/
  components/   Pages and reusable UI components
  utils/        Redux store, slices, API URL, and Socket.IO setup
  assets/       Local images used by the application
  App.jsx       Application routes
  main.jsx      React entry point
```

## Prerequisites

- Node.js 18 or newer
- npm
- The GitTogether backend running locally or deployed

## Getting Started

1. Clone this repository:

   ```bash
   git clone https://github.com/newfool-web/git_together_web.git
   cd git_together_web
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure the backend URL.

   Create a `.env` file in the project root:

   ```env
   VITE_BACKEND_URL=http://localhost:3000
   ```

   The default local API is `http://localhost:3000/api`, and the app uses it without additional configuration when running on localhost.

4. Start the frontend:

   ```bash
   npm run dev
   ```

5. Open the local Vite URL shown in the terminal.

## Backend Setup

The backend is maintained in a separate repository:

- Repository: https://github.com/newfool-web/git_together

Follow that repository's setup instructions to start the API and Socket.IO server. When running locally, ensure the backend is available on port `3000`, or set `VITE_BACKEND_URL` to the deployed or alternate backend origin.

## Environment Variables

| Variable | Description | Example |
| --- | --- | --- |
| `VITE_BACKEND_URL` | Backend origin without `/api` | `http://localhost:3000` |

In production, `VITE_BACKEND_URL` can point to the hosted backend. If omitted, the app uses `/api` as the API base.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |

## Application Routes

| Route | Description |
| --- | --- |
| `/` | Landing page |
| `/register` | Create an account |
| `/login` | Log in |
| `/feed` | Discover developers |
| `/profile` | View or edit the current profile |
| `/connections` | View accepted connections |
| `/requests` | Review pending connection requests |
| `/chat/:targetUserId` | Chat with a connection |

## API Integration

The frontend sends credentialed requests to the backend under `/api` and connects to the Socket.IO server for real-time chat. Local Socket.IO development connects directly to `http://localhost:3000`; production uses the `/api/socket.io` path.

## License

No license has been specified for this project.
