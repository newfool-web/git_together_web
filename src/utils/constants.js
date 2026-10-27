// Backend serves all routes under /api in both development and production.
const getBackendUrl = () => {
  // Production: use env URL + /api to match the backend's base path.
  if (import.meta.env.VITE_BACKEND_URL) {
    const url = import.meta.env.VITE_BACKEND_URL;
    return `${url}/api`;
  }
  // Development: backend runs locally on port 3000 under /api.
  if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
    return "http://localhost:3000/api";
  }
  // Production without env: use /api (proxied by vercel.json to backend).
  return "/api";
};

export const BASE_URL = getBackendUrl();
