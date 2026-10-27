import io from "socket.io-client";

export const createSocketConnection = () => {
  if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
    // Dev: connect to the backend origin (Socket.IO uses its default /socket.io path).
    return io("http://localhost:3000");
  } else {
    return io("/", { path: "/api/socket.io" });
  }
};