const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        method: ["GET", "POST"],
    },
});

const games = new Map();


io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("create_room", (data) => {
        console.log(`Room created by ${socket.id}`)

        socket.join(data.room);
        games.set(data.room, data.game);
        
        const size = io.sockets.adapter.rooms.get(data.room).size;
        io.to(socket.id).emit("getUserInfo", size);
    });

    socket.on("join_room", (data) => {

        const roomExists = io.sockets.adapter.rooms.get(data);

        if (roomExists) {
            socket.join(data);
            
            const size = io.sockets.adapter.rooms.get(data).size;
            io.to(socket.id).emit("getUserInfo", size);


            if (size >= 2) {
                console.log(`Room full, size is ${size}`)

                let game = games.get(data);
                io.to(data).emit("roomFull", {room : data, size : size, game : game});
            }
        }
        else {
            console.log("No room exists")
        }
    });


    

    socket.on("disconnect", () => {
        console.log(`User Disconnected: ${socket.id}`);
    });
});




server.listen(3001, () => {
    console.log("SERVER RUNNING")
});