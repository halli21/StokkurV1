import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");
//const socket = io.connect("http://16.16.126.64:3001");

import React, { useState, useEffect } from "react";
import { View, Text } from 'react-native';

import GameMenuAlt from './src/views/GameMenuAlt';
import LogIn from "./src/views/LogIn";


export default function App() {

    const [loggedIn, setLoggedIn] = useState(false);
    const [name, setName] = useState('');

    const giveName = () => {
        if (name !== "") {
            setName(name);
            setLoggedIn(true);
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
