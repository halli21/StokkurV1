import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import styles from "./styles";

import createCode from "../../utils/codeGenerator";
import GameSession from "../GameSession";

import SkitakallGame from "../../components/SkitakallGame";
import JoinRoom from "../JoinRoom";
import OnlinePlayers from "../OnlinePlayers";
import InviteInbox from "../InviteInbox";


const GameMenu = ({socket, name}) => {

    const [room, setRoom] = useState('');
    const [joinedRoom, setJoinedRoom] = useState(false);

    const [joinViewOpen, setJoinViewOpen] = useState(false);

    const [inviteViewOpen, setInviteViewOpen] = useState(false);

    const [inviteInboxOpen, setInviteInboxOpen] = useState(false);
    const [inbox, setInbox] = useState([]);


    useEffect(() => {
        socket.on("validJoin", () => {
            setJoinViewOpen(false);
            setJoinedRoom(true);
        });

        socket.on("leftGame", () => {
            setRoom('');
            setJoinedRoom(false);
        });

        socket.on("inviteRecieved", (data) => {
            setInbox((inbox) => {
                const existingInvite = inbox.find((invite) => invite.fromSocketId === data.fromSocketId);
                if (existingInvite) {
                    const updatedInbox = inbox.filter((invite) => invite.fromSocketId !== data.fromSocketId);
                    return [...updatedInbox, data];
                } 
                else {
                    return [...inbox, data];
                }
            });
        });


        socket.on("inviteGame", (data) => {
            closeAll();
            setRoom(data);
            setJoinedRoom(true);
        });
    
    }, []);


    const createRoom = () => {
        const gameCode = createCode();
        setRoom(gameCode)
        setJoinedRoom(true);
        socket.emit("create_room", {gameCode: gameCode, host: name});
    };

    const closeCreate = () => {
        socket.emit("gameNotAvailable", room);
        setRoom('');
        setJoinedRoom(false);
    };

    const joinGame = () => {
        if (room !== "") {
            setRoom(room);
            socket.emit("join_room", room);
        }
    };



    const openJoinView = () => {
        setJoinViewOpen(true);
    };

    const closeJoinView = () => {
        setJoinViewOpen(false);
    };

    const joinFromView = (roomId) => {
        setRoom(roomId);
        socket.emit("join_room", roomId);
    };


    const openInviteView = () => {
        setInviteViewOpen(true);
    };

    const closeInviteView = () => {
        setInviteViewOpen(false);
    };


    const openInviteInbox = () => {
        setInviteInboxOpen(true);
    };

    const closeInviteInbox = () => {
        setInviteInboxOpen(false);
    };



    const closeAll = () => {
        setJoinViewOpen(false);
        setInviteViewOpen(false);
        setInviteInboxOpen(false);
    }



    return (
        <View style={styles.container}>

            {inviteInboxOpen && (
                <InviteInbox socket={socket} inbox={inbox} setInbox={setInbox} closeInviteInbox={closeInviteInbox}></InviteInbox>
            )}

            {inviteViewOpen && (
                <OnlinePlayers socket={socket} closeInviteView={closeInviteView}></OnlinePlayers>
            )}

            {joinViewOpen && (
                <JoinRoom socket={socket} joinGame={joinFromView} closeJoinView={closeJoinView}></JoinRoom>
            )}

            {!joinedRoom ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={styles.inboxContainer}>
                        <View style={styles.menuButton}>
                            <TouchableOpacity onPress={openInviteInbox}>
                                <Text style={styles.buttonText}>Inbox</Text>
                            </TouchableOpacity>
                        </View>

                        {(inbox.length > 0) && (
                            <View style={styles.notification}>
                                <Text style={styles.count}>{inbox.length}</Text>
                            </View>
                        )}
                        
                    </View>

                    <View style={styles.menuButton}>
                        <TouchableOpacity onPress={openInviteView}>
                            <Text style={styles.buttonText}>Invite Players</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.menuButton}>
                        <TouchableOpacity onPress={openJoinView}>
                            <Text style={styles.buttonText}>Open Games</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.menuButton}>
                        <TouchableOpacity onPress={createRoom}>
                            <Text style={styles.buttonText}>Create Game</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.joinGame}>
                        <TextInput
                            style={styles.inputCode}
                            placeholder={"Enter game code"}
                            onChangeText={(text) => {setRoom(text);}}
                        />
                        <TouchableOpacity style={styles.inputButton} onPress={joinGame}>
                            <Text>Join</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.psText}>P.S. one person creates, one person joins</Text>
                </View>

            ) : (
                <GameSession socket={socket} name={name} Game={SkitakallGame} gameCode={room} closeCreate={closeCreate}/>
            )}  
        </View>
    );
}

export default GameMenu;