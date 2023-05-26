import io from "socket.io-client";
//const socket = io.connect("http://localhost:3001");

// Heima
const socket = io.connect("http://192.168.1.42:3001");

//Server
//const socket = io.connect("http://16.16.126.64:3001");

import React, { useState } from "react";
import { View } from 'react-native';

import GameMenuAlt from './src/views/GameMenuAlt';
import LogIn from "./src/views/LogIn";


export default function App() {

    const [loggedIn, setLoggedIn] = useState(false);
    const [name, setName] = useState('');

    const giveName = () => {
        if (name !== "") {
            setName(name);
            setLoggedIn(true);
            socket.emit("saveName", name);
        }
    }

    return (
        <View>
            {!loggedIn && (
                <LogIn setName={setName} giveName={giveName}></LogIn>
            )} 

            {loggedIn && (
                <GameMenuAlt socket={socket} name={name}></GameMenuAlt>
            )} 
        </View>
    );
}
