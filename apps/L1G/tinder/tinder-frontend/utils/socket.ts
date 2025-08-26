import { io } from 'socket.io-client';

const socket = io('http://localhost:10000/', {
  transports: ['websocket'],
});

socket.on('connect', () => {
  console.log('Connected to socket server');
});
export default socket;
