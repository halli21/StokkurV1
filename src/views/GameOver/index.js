import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./styles";

import trophy from "../../resources/trophy.jpg";

const GameOver = ({socket, winner}) => {

    const backToMenu = () => {
        socket.emit("leaveGame");
    }

    return (
        <View style={styles.gameOverOverlay}>
            <Image source={trophy} style={styles.trophy}/>
            <Text style={styles.winnerText}>{winner}</Text>
            <Text style={styles.winnerSubText}>is the winner!</Text>

            <TouchableOpacity onPress={() => backToMenu()} style={styles.loadButton}><Text style={styles.backText}>Menu</Text></TouchableOpacity>
        </View>
   
)};

export default GameOver;