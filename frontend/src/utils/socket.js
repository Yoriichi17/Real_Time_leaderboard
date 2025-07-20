import { io } from 'socket.io-client';
import { BASE_URL } from './link';

const socket = io(`${BASE_URL}`); // backend-url

export default socket;
