import { io } from "socket.io-client";
const SOCKET_URL = "http://192.168.1.19:3001";  // sua API

// Conexão única
const socket = io(SOCKET_URL, {
  transports: ["websocket"],
  autoConnect: true,
});


export default socket;