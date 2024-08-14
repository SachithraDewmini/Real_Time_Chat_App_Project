const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { 
    cors: {
        origin: "*"
    }
});

io.on("connection", (socket) => {
    console.log("connected");

    socket.on("chat", chat => {
        io.emit("chat", chat); // Emit only the new chat message
    });

    socket.on("disconnect", () => {
        console.log("disconnected");
    });
});

server.listen("3002", () => {
    console.log("running on port 3002");
});
