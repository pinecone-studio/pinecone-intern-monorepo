import { io } from 'socket.io-client';
const SOCKET_URL = process.env.SOCKET_URI || 'http://localhost:10000';

export const socket = io(SOCKET_URL, {
  autoConnect: false,
});
