import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import styles from "./styles";

import createCode from "../../utils/codeGenerator";
import GameSession from "../GameSession";

import SkitakallGame from "../../components/SkitakallGame";

import createNewGame from "../../utils/generateSkitakall";



const GameMenu = ({socket}) => {

    const [room, setRoom] = useState('');
    const [gameInstance, setGameInstance] = useState(null);
    const [numPlayers, setNumPlayers] = useState(0);


    useEffect(() => {
        socket.on("roomFull", (data) => {
            setNumPlayers(data.size);
            setGameInstance(data.game);
        });
    
    }, []);


    const createRoom = () => {
        const gameCode = createCode();
        const gameInstance = createNewGame();
        setRoom(gameCode)
        setGameInstance(gameInstance);
        socket.emit("create_room", {room: gameCode, game: gameInstance});
    };

    const closeCreate = () => {
        setRoom('');
        setGameInstance(null);
    };

    const joinGame = () => {
        if (room !== "") {
            setRoom(room);
            socket.emit("join_room", room);
        }
    };


    return (
        <View style={styles.container}>

            {!gameInstance ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
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
                <GameSession socket={socket} Game={SkitakallGame} gameCode={room} numPlayers={numPlayers} closeCreate={closeCreate}/>
            )}  

  

        </View>
    );
}

export default GameMenu;