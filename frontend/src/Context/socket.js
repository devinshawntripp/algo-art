import React from 'react'
import socketio from "socket.io-client";
// import { SOCKET_URL } from "config";

export const Socket = socketio.connect('http://localhost:8174/');
export const SocketContext = React.createContext();