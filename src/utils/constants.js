// Use environment variable for backend URL, fallback to localhost for development
const getBackendUrl = () => {
  // In production, use the environment variable or default to /api (which will be proxied)
  if (import.meta.env.VITE_BACKEND_URL) {
    return import.meta.env.VITE_BACKEND_URL;
  }
  // Development: use localhost
  if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
    return "http://localhost:3000";
  }
  // Production: use /api which will be proxied by Vercel
  return "/api";
};

export const BASE_URL = getBackendUrl();
