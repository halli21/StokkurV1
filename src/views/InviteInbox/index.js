import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import styles from "./styles";



const InviteInbox = ({socket, inbox, setInbox, closeInviteInbox}) => {

    const MAX_LENGTH = 12;

    const acceptInvite = (acceptedInv) => {
        const updatedInbox = inbox.filter((invite) => invite.fromSocketId !== acceptedInv.fromSocketId);
        setInbox(updatedInbox);
        socket.emit("inviteAccepted", acceptedInv);
    }

    return (
  
        <View style={styles.joinViewOverlay}>

            <ScrollView horizontal={false} style={styles.gameList}>
                {inbox.map((invite) => (
                    <View key={invite.fromSocketId} style={styles.option}>
                        <TouchableOpacity style={styles.gameButton} onPress={() => acceptInvite(invite)}>
                            <Text style={styles.hostText}>
                                {invite.fromName && invite.fromName.length > MAX_LENGTH
                                    ? `${invite.fromName.slice(0, MAX_LENGTH)}...`
                                    : invite.fromName
                                }
                            </Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
            
            <TouchableOpacity onPress={() => closeInviteInbox()} style={styles.loadButton}><Text style={styles.backText}>Back</Text></TouchableOpacity>
        </View>
   
)};

export default InviteInbox;