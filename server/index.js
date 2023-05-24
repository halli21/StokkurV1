const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const { Console } = require("console");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        method: ["GET", "POST"],
    },
});

const connectedUsers = {};
const activeRooms = {};
const roomLocks = {};


const addUser = (socketId) => {
    connectedUsers[socketId] = {
        socketId: socketId,
        name: '',
    };
}

const getConnectedUsers = (mySocketId) => {
    const users = Object.values(connectedUsers);
    const allUsers = users.filter((user) => user.socketId !== mySocketId && user.name !== '');
    return allUsers;
}




const addRoom = (roomId, hostName) => {
    activeRooms[roomId] = {
        host: hostName,
        roomId: roomId,
        gameStarted: false,
        playersReady: 0
    };
}

const removeRoom = (roomId) => {
    delete activeRooms[roomId];
}

const gameStarted = (roomId) => {
    return activeRooms[roomId].gameStarted;
}

const startGame = (roomId) => {
    activeRooms[roomId].gameStarted = true;
}

const getAvailableRooms = () => {
    const rooms = Object.values(activeRooms);
    const availableRooms = rooms.filter(room => !room.gameStarted);
    return availableRooms;
}


io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
    addUser(socket.id);

    socket.on("saveName", (data) => {
        connectedUsers[socket.id].name = data;
    });


    socket.on("create_room", (data) => {
        console.log(`Room created by ${socket.id}`)

        socket.join(data.gameCode);

        addRoom(data.gameCode, data.host);
        
        const size = io.sockets.adapter.rooms.get(data.gameCode).size;
        io.to(socket.id).emit("getUserInfo", size);
    });


    socket.on("join_room", (data) => {

        const roomExists = io.sockets.adapter.rooms.get(data);

        if (roomExists) {
            async function join() {
                async function acquireLock() {
                    while (roomLocks[data]) {
                        await new Promise(resolve => setTimeout(resolve, 100));
                    }
                    roomLocks[data] = true;
                }
    
                await acquireLock();
                console.log(`User ${socket.id} acquired lock`);
    
                roomLocks[data] = true;

                const started = gameStarted(data);
                
                if (!started) {
                    console.log('joining game')

                    socket.join(data);

                    io.to(socket.id).emit("validJoin");

                    const size = io.sockets.adapter.rooms.get(data).size;
                    io.to(socket.id).emit("getUserInfo", size);


                    if (size >= 2) {              
                        startGame(data);
                        io.to(data).emit("startGame");
                    }
                }
                else {
                    console.log('cant join, game started')
                }

                delete roomLocks[data];                
            }
    
                    
            join().then(() => {
                console.log('finished critical zone');
            });
          
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


    socket.on("gameNotAvailable", (data) => {
        removeRoom(data);
    });


    socket.on("leaveGame", () => {
        io.to(socket.id).emit("leftGame");
    });


    // IN CASE OF PRE GAME

    socket.on("signalReady", (data) => {

        async function signal() {
            async function acquireLock() {
                while (roomLocks[data]) {
                    await new Promise(resolve => setTimeout(resolve, 100));
                }
                roomLocks[data] = true;
            }

            await acquireLock();
            console.log(`User ${socket.id} acquired lock`);

            roomLocks[data] = true;

            activeRooms[data].playersReady = activeRooms[data].playersReady + 1;

            if (activeRooms[data].playersReady === 2) {
                delete roomLocks[data];
                io.to(data).emit("playersReady");
            } else {
                delete roomLocks[data];
            }
        }

                
        signal().then(() => {
            console.log('finished signaling');
            console.log(activeRooms[data].playersReady);
        });

    });


    // GET DATA

    socket.on("getAvailableGames", () => {
        const openGames = getAvailableRooms();
        io.to(socket.id).emit("openGames", openGames);
    });

    socket.on("getConnectedPlayers", () => {
        const playersOnline = getConnectedUsers(socket.id);
        io.to(socket.id).emit("playersOnline", playersOnline);
    });



    // INVITES

    socket.on("inviteSent", (data) => {
        const fromName = connectedUsers[socket.id].name;
        io.to(data.toSocketId).emit("inviteRecieved", {fromSocketId: socket.id, fromName: fromName});
    });
    

    socket.on("inviteAccepted", (data) => {
        const gameCode = '1';

        console.log(`Socket Id: ${socket.id}, data: ${data.fromName} : ${data.fromSocketId}`)

        socket.join(gameCode);
        addRoom(gameCode, data.fromName);


        io.to(socket.id).emit("inviteGame", gameCode);

        const size = io.sockets.adapter.rooms.get(gameCode).size;
        io.to(socket.id).emit("getUserInfo", size);


        const otherSocket = io.sockets.sockets.get(data.fromSocketId);

        otherSocket.join(gameCode);
        io.to(otherSocket.id).emit("inviteGame", gameCode);
        io.to(otherSocket.id).emit("getUserInfo", size);

        startGame(gameCode);
        io.to(gameCode).emit("startGame");
    });

    
    socket.on("disconnect", () => {
        console.log(`User Disconnected: ${socket.id}`);
        delete connectedUsers[socket.id];
    });
});




server.listen(3001, () => {
    console.log("SERVER RUNNING")
});