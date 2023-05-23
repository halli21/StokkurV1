import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import styles from "./styles";

import WaitingScreen from "../WaitingScreen";



const GameSession = ({socket, name, Game, gameCode, closeCreate}) => {

    const [user, setUser] = useState('');
    const [numPlayers, setNumPlayers] = useState(0);


    useEffect(() => {
        socket.on("getUserInfo", (data) => {
            setUser(`Player ${data}`);
        });

        socket.on("roomFull", (data) => {
            setNumPlayers(data);
        });

    }, []);


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>

            {numPlayers >= 2 ? ( 
                <Game socket={socket} name={name} room={gameCode} user={user} numPlayers={numPlayers}></Game>
            ) : (
                
                <WaitingScreen gameCode={gameCode} closeCreate={closeCreate}/>
            )}
        
        </View>
    );
}

export default GameSession;