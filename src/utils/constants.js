// Backend on Vercel uses basePath = "/api" (all routes under /api). Local dev uses no prefix.
const getBackendUrl = () => {
  // Production: use env URL + /api to match backend's basePath on Vercel
  if (import.meta.env.VITE_BACKEND_URL) {
    const url = import.meta.env.VITE_BACKEND_URL;
    return `${url}/api`;
  }
  // Development: backend runs with basePath = "" so no /api prefix
  if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
    return "http://localhost:3000";
  }
  // Production without env: use /api (proxied by vercel.json to backend)
  return "/api";
};

export const BASE_URL = getBackendUrl();
