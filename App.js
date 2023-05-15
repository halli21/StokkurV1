//import io from "socket.io-client";
//const socket = io.connect("http://localhost:3001");

import { View } from 'react-native';

import GameMenu from './src/views/GameMenu';







export default function App() {

    return (
        <View>
            <GameMenu></GameMenu>
        </View>
    );
}
