import React, { useState } from 'react';

import { StyleSheet, Text, View, Dimensions, PixelRatio, ScrollView } from 'react-native';

import SkitakallSetUp from './src/views/SkitakallSetUp';
import Table from './src/views/Table';
import PlayerHand from './src/views/PlayerHand';



const { width, height } = Dimensions.get('window');
const pixelRatio = PixelRatio.get();

const rem = 16; 
const em = rem * pixelRatio;




export default function App() {


    return (
        <View style={styles.container}>
            <View style={{ flex: 0.35, backgroundColor: 'white'}}></View>

            <View style={{ flex: 1, backgroundColor: 'blue'}}>
                <SkitakallSetUp></SkitakallSetUp>
            </View>

            <View style={{ flex: 1, backgroundColor: 'yellow'}}>
                <PlayerHand></PlayerHand>
            </View> 
            

            <View style={{ flex: 1.5, backgroundColor: 'red', justifyContent: 'center' }}>
                <Table></Table>
            </View> 

            
            <View style={{ flex: 1.2, backgroundColor: 'yellow', justifyContent: 'center'}}>
                <PlayerHand></PlayerHand>
            </View>

            <View style={{ flex: 1.2, backgroundColor: 'blue', justifyContent: 'center'}}>
                <SkitakallSetUp></SkitakallSetUp>
            </View>

            <View style={{ flex: 0.6, backgroundColor: 'white' }}></View> 
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'stretch',
        height: height * 1,
    },
});
