"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const express = require('express');
const cors = require('cors');
const app = express();
const httpServer = (0, http_1.createServer)();
// Cors
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
// Socket.io
const wsServer = new socket_io_1.Server(httpServer, {
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
    socket.on('join_room', (roomName, callback) => {
        socket.join(roomName);
        callback();
        // 현재 방 상태 확인
        const rooms = wsServer.sockets.adapter.rooms;
        // console.log(rooms);
    });
    socket.on('message', (roomName, msg) => {
        console.log('roomName: ', roomName);
        console.log('msg: ', msg);
        socket.to(roomName).emit('message', roomName, msg);
        // socket.emit('message', msg);
    });
});
// Express Server Listen
httpServer.listen(4000, () => console.log('Server Connecting... 4000'));
