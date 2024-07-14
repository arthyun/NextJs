import { Server } from 'socket.io';
import { createServer } from 'http';
const express = require('express');
const cors = require('cors');
const app = express();
const httpServer = createServer();

// Cors
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true
  })
);

// Types
interface ServerToClientEvents {
  join_room: (roomName: string, callback: () => void) => void;
  message: (roomName: string, msg: string) => void;
  live: (callback: () => void) => void;
}

// Socket.io
const wsServer = new Server<ServerToClientEvents>(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET, POST']
  }
});

wsServer.on('connection', (socket) => {
  console.log('welcome socket server');

  // 어떤 이벤트중인지 감지
  socket.onAny((event) => {
    console.log(`Socket Event: ${event}`);
  });

  // 방 입장
  socket.on('join_room', (roomName, callback) => {
    socket.join(roomName);
    callback();
    // 현재 방 상태 확인
    const rooms = wsServer.sockets.adapter.rooms;
    // console.log(rooms);
  });

  // 메세지 주고 받음
  socket.on('message', (roomName, msg) => {
    socket.to(roomName).emit('message', roomName, msg);
  });

  // // 테스트
  // setInterval(async () => {
  //   const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  //   const result = await response.json();
  //   socket.emit('live', result);
  // }, 3000);
});

// Express Server Listen
httpServer.listen(4000, () => console.log('Server Connecting... 4000'));
