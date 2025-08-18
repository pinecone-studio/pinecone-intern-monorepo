import { io } from 'socket.io-client';

const SOCKET_URL = process.env.BACKEND_URI || 'http://localhost:4000';

export const socket = io(SOCKET_URL, {
  autoConnect: false,
});
