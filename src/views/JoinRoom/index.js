import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import styles from "./styles";



const JoinRoom = ({socket, joinGame, closeJoinView}) => {

    const MAX_LENGTH = 12;

    const [openGames, setOpenGames] = useState([]);

    useEffect(() => {
        const fetchAvailableGames = () => {
            socket.emit("getAvailableGames");
        };
        
        fetchAvailableGames();
        const interval = setInterval(fetchAvailableGames, 5000);
        return () => clearInterval(interval);

    }, []);


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
                            <Text style={styles.hostText}>{game.host.length > MAX_LENGTH ? `${game.host.slice(0, MAX_LENGTH)}...` : game.host}</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
            
            <TouchableOpacity onPress={() => closeJoinView()} style={styles.loadButton}><Text style={styles.backText}>Back</Text></TouchableOpacity>
        </View>
   
)};

export default JoinRoom;