import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import styles from "./styles";

import createCode from "../../utils/codeGenerator";
import WaitingScreen from "../WaitingScreen";



const GameSession = ({socket, Game, gameCode, numPlayers, closeCreate}) => {

    const [user, setUser] = useState('');

    useEffect(() => {
        socket.on("getUserInfo", (data) => {
            setUser(`Player ${data}`);
            console.log(data)
        });
    
    }, []);


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>

            {numPlayers >= 2 ? ( 
                <Game></Game>
            ) : (
                <WaitingScreen gameCode={gameCode} closeCreate={closeCreate}/>
            )}
        
            
        </View>
    );
}

export default GameSession;