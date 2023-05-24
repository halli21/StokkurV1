import React, { useState, useEffect } from "react";
import { View } from 'react-native';
import styles from "./styles";

import WaitingScreen from "../WaitingScreen";



const GameSession = ({socket, name, Game, gameCode, closeCreate}) => {

    const [user, setUser] = useState('');
    const [gameStarted, setGameStarted] = useState(false);


    useEffect(() => {
        socket.on("getUserInfo", (data) => {
            console.log("getUserInfo")
            setUser(`Player ${data}`);
        });

        socket.on("startGame", () => {
            setGameStarted(true);
        });

    }, []);


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>

            {gameStarted ? ( 
                <Game socket={socket} name={name} room={gameCode} user={user}></Game>
            ) : (
                <WaitingScreen gameCode={gameCode} closeCreate={closeCreate}/>
            )}
        
        </View>
    );
}

export default GameSession;