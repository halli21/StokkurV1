import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import styles from "./styles";

import createCode from "../../utils/codeGenerator";
import WaitingScreen from "../WaitingScreen";



const GameMenu = ({}) => {

    const [user, setUser] = useState('');
    const [room, setRoom] = useState('');
    const [numPlayers, setNumPlayers] = useState(0);


    const createRoom = () => {
        const gameCode = createCode();
        setRoom(gameCode)

        //socket.emit("create_room", {room: gameCode, game: gameInstance});
    };

    const closeCreate = () => {
        setRoom('')

    };



    return (
        <View style={styles.container}>
            <View style={{ flex: 0.1, backgroundColor: 'blue'}}></View>


            {!room ? (
                <View style={{ flex: 1.5, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
                    <View style={styles.createButton}>
                        <TouchableOpacity onPress={createRoom}>
                            <Text style={styles.buttonText}>Create Game</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.joinGame}>
                        <TextInput
                            style={styles.inputCode}
                            placeholder={"Enter game code"}
                        />
                        <TouchableOpacity style={styles.inputButton}>
                            <Text>Join</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.psText}>P.S. one person creates, one person joins</Text>
                </View>
            ) : (
                <View style={{ flex: 1.5, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
                    <WaitingScreen gameCode={room} closeCreate={closeCreate}/>
                </View>
            )}  

            <View style={{ flex: 0.15, backgroundColor: 'blue'}}></View>

        </View>
    );
}

export default GameMenu;