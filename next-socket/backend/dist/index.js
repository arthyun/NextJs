"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    // 테스트
    setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield fetch('https://jsonplaceholder.typicode.com/todos/1');
        const result = yield response.json();
        socket.emit('live', result);
    }), 3000);
});
// Express Server Listen
httpServer.listen(4000, () => console.log('Server Connecting... 4000'));
