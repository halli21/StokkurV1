import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import styles from "./styles";

import createCode from "../../utils/codeGenerator";
import GameSession from "../GameSession";

import SkitakallGame from "../../components/SkitakallGame";
import JoinRoom from "../JoinRoom";


const GameMenu = ({socket, name}) => {

    const [room, setRoom] = useState('');
    const [joinedRoom, setJoinedRoom] = useState(false);

    const [joinViewOpen, setJoinViewOpen] = useState(false);


    useEffect(() => {
        socket.on("validJoin", () => {
            setJoinedRoom(true);
        });

        socket.on("leftGame", () => {
            setRoom('');
            setJoinedRoom(false);
        });
    
    }, []);


    const createRoom = () => {
        const gameCode = createCode();
        setRoom(gameCode)
        setJoinedRoom(true);
        socket.emit("create_room", {gameCode: gameCode, host: name});
    };

    const closeCreate = () => {
        setRoom('');
        setJoinedRoom(false);
    };

    const joinGame = () => {
        if (room !== "") {
            setRoom(room);
            socket.emit("join_room", room);
        }
    };


    const openJoinView = () => {
        socket.emit("getAvailableGames");
        setJoinViewOpen(true);
    };

    const closeJoinView = () => {
        setJoinViewOpen(false);
    };

    const joinFromView = (roomId) => {
        setRoom(roomId);
        socket.emit("join_room", roomId);
    };


    return (
        <View style={styles.container}>

            {joinViewOpen && (
                <JoinRoom socket={socket} joinGame={joinFromView} closeJoinView={closeJoinView}></JoinRoom>
            )}

            {!joinedRoom ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={styles.createButton}>
                        <TouchableOpacity onPress={openJoinView}>
                            <Text style={styles.buttonText}>Open Games</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.createButton}>
                        <TouchableOpacity onPress={createRoom}>
                            <Text style={styles.buttonText}>Create Game</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.joinGame}>
                        <TextInput
                            style={styles.inputCode}
                            placeholder={"Enter game code"}
                            onChangeText={(text) => {setRoom(text);}}
                        />
                        <TouchableOpacity style={styles.inputButton} onPress={joinGame}>
                            <Text>Join</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.psText}>P.S. one person creates, one person joins</Text>
                </View>

            ) : (
                <GameSession socket={socket} Game={SkitakallGame} gameCode={room} closeCreate={closeCreate}/>
            )}  
        </View>
    );
}

export default GameMenu;