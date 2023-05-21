const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        method: ["GET", "POST"],
    },
});


const availableRooms = {};

const createRoom = (roomId, hostName) => {
    availableRooms[roomId] = {
        host: hostName,
        roomId: roomId
    };
}


const closeRoom = (roomId) => {
    delete availableRooms[roomId];
}

const getAvailableRooms = () => {
    const rooms = Object.values(availableRooms);
    return rooms;
}


io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("create_room", (data) => {
        console.log(`Room created by ${socket.id}`)

        socket.join(data.gameCode);

        createRoom(data.gameCode, data.host);
        
        const size = io.sockets.adapter.rooms.get(data.gameCode).size;
        io.to(socket.id).emit("getUserInfo", size);
    });

    socket.on("join_room", (data) => {

        const roomExists = io.sockets.adapter.rooms.get(data);

        if (roomExists) {
            socket.join(data);

            io.to(socket.id).emit("validJoin");
            
            const size = io.sockets.adapter.rooms.get(data).size;
            io.to(socket.id).emit("getUserInfo", size);

            if (size >= 2) {
                console.log(`Room full, size is ${size}`)

                io.to(data).emit("roomFull", size);
            }
        }
        else {
            console.log("No room exists")
        }
    });

    socket.on("initGame", (data) => {
        io.to(data.room).emit("initGameState", {turn: data.turn, player1HiddenCards: data.player1HiddenCards, player1VisibleCards: data.player1VisibleCards, player1Hand: data.player1Hand, player2HiddenCards: data.player2HiddenCards, player2VisibleCards: data.player2VisibleCards, player2Hand: data.player2Hand, drawCardsPile: data.drawCardsPile});
    });


    socket.on("updateGame", (data) => {
        io.to(data.room).emit("updateGameState", {gameOver: data.gameOver, winner: data.winner, turn: data.turn, player1HiddenCards: data.player1HiddenCards, player1VisibleCards: data.player1VisibleCards, player1Hand: data.player1Hand, player2HiddenCards: data.player2HiddenCards, player2VisibleCards: data.player2VisibleCards, player2Hand: data.player2Hand, drawCardsPile: data.drawCardsPile, playedCardsPile: data.playedCardsPile});
    });


    socket.on("leaveGame", () => {
        io.to(socket.id).emit("leftGame");
    });


    socket.on("signalReady", (data) => {
        io.to(data.room).emit("playerReady", {playersReady: data.playersReady});
    });



    socket.on("getAvailableGames", () => {
        const openGames = getAvailableRooms();
        io.to(socket.id).emit("openGames", openGames);
    });


    
    socket.on("disconnect", () => {
        console.log(`User Disconnected: ${socket.id}`);
    });
});




server.listen(3001, () => {
    console.log("SERVER RUNNING")
});