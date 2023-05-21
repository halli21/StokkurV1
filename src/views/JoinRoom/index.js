import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import styles from "./styles";



const JoinRoom = ({socket, joinGame, closeJoinView}) => {

    const [openGames, setOpenGames] = useState([]);

    useEffect(() => {
        socket.on("openGames", (data) => {
            setOpenGames([...data]);
        });
    
    }, []);


    return (
  
        <View style={styles.joinViewOverlay}>

            <ScrollView horizontal={false} style={styles.gameList}>
                {openGames.map((game) => (
                    <View key={game.roomId} style={styles.option}>
                        <TouchableOpacity style={styles.gameButton} onPress={() => joinGame(game.roomId)}>
                            <Text style={styles.backText}>{game.host}</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
    

            <TouchableOpacity onPress={() => closeJoinView()} style={styles.loadButton}><Text style={styles.backText}>Back</Text></TouchableOpacity>
        </View>
   
)};

export default JoinRoom;