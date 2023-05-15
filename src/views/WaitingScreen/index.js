import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";

import Spinner from "../../components/Spinner";


const WaitingScreen = ({gameCode, closeCreate}) => {


    return (

        <View style={styles.container}>
            <Text style={styles.loadText}>The game code is:</Text>
            <Text style={styles.loadHeader}>{gameCode}</Text>
            <Text style={styles.loadText}>Waiting for player to join</Text>
            <Spinner/>
            <TouchableOpacity onPress={closeCreate} style={styles.loadButton}><Text style={styles.backText}>Back</Text></TouchableOpacity>

        </View>



)};

export default WaitingScreen;