import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import styles from "./styles";



const OnlinePlayers = ({socket, closeInviteView}) => {

    const MAX_LENGTH = 12;

    const [playersOnline, setPlayersOnline] = useState([]);

    const [invitedMessageVisible, setInvitedMessageVisible] = useState(false);

    useEffect(() => {
        const fetchOnlinePlayers= () => {
            socket.emit("getConnectedPlayers");
        };
        
        fetchOnlinePlayers();
        const interval = setInterval(fetchOnlinePlayers, 5000);
        return () => clearInterval(interval);

    }, []);


    useEffect(() => {
        socket.on("playersOnline", (data) => {
            setPlayersOnline(data);
        });
    
    }, []);


    const sendInvite = (player) => {
        setInvitedMessageVisible(true);
        setTimeout(() => {
            setInvitedMessageVisible(false);
        }, 3000);

        socket.emit("inviteSent", {toSocketId: player.socketId, toName: player.name});
    };


    return (
  
        <View style={styles.joinViewOverlay}>

            {invitedMessageVisible && (
                <View style={styles.inviteMessage}>
                    <Text>Invited</Text>
                </View>
            )}


            <ScrollView horizontal={false} style={styles.gameList}>
                {playersOnline.map((player) => (
                    <View key={player.socketId} style={styles.option}>

                        <TouchableOpacity style={styles.gameButton} onPress={() => sendInvite(player)}>
                            <Text style={styles.hostText}>
                                {player.name && player.name.length > MAX_LENGTH
                                    ? `${player.name.slice(0, MAX_LENGTH)}...`
                                    : player.name
                                }
                            </Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
            
            <TouchableOpacity onPress={() => closeInviteView()} style={styles.loadButton}><Text style={styles.backText}>Back</Text></TouchableOpacity>
        </View>
   
)};

export default OnlinePlayers;