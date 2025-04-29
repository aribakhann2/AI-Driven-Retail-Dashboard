// src/socket.ts
import { io, Socket } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_API_URL || "ws://localhost:5000";

const socket: Socket = io(SOCKET_URL, {
  transports: ["websocket", "polling"],
  reconnection: true,
  reconnectionAttempts: 5,
  timeout: 20000,
});

export default socket;
