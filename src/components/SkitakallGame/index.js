import React, { useState, useEffect } from 'react';

import { View } from 'react-native';

import styles from "./styles";

const _ = require('lodash');

import { deckOfCards } from '../../utils/deckOfCards.js';
import shuffleArray from '../../utils/shuffleArray';

import SkitakallSetUp from '../../views/SkitakallSetUp';
import Table from '../../views/Table';
import PlayerHand from '../../views/PlayerHand';
import OpponentHand from '../../views/OpponentHand';



const SkitakallGame = () => {

    const [myHand, setMyHand] = useState([]);
    const [myVisibleCards, setMyVisibleCards] = useState([null, null, null]);
    const [myHiddenCards, setMyHiddenCards] = useState([]);

    const [opponentHand, setOpponentHand] = useState([]);
    const [opponentVisibleCards, setOpponentVisibleCards] = useState([null, null, null]);
    const [opponentHiddenCards, setOpponentHiddenCards] = useState([]);

    const [drawCardsPile, setDrawCardsPile] = useState([]);
    const [playedCardsPile, setPlayedCardsPile] = useState([]);


    useEffect(() => {
        const copyCards = _.cloneDeep(deckOfCards);
        const shuffledCards = shuffleArray(copyCards);

        const myHiddenCards = shuffledCards.splice(0, 3);
        const myVisibleCards = shuffledCards.splice(0, 3);
        const myHand = shuffledCards.splice(0, 3);

        const opponentHiddenCards = shuffledCards.splice(0, 3);
        const opponentVisibleCards = shuffledCards.splice(0, 3);
        const opponentHand = shuffledCards.splice(0, 3);

        const drawCardsPile = shuffledCards;

        console.log(drawCardsPile)

        setMyHand(myHand);
        setMyVisibleCards(myVisibleCards);
        setMyHiddenCards(myHiddenCards);

        setOpponentHand(opponentHand);
        setOpponentVisibleCards(opponentVisibleCards);
        setOpponentHiddenCards(opponentHiddenCards);

        setDrawCardsPile(drawCardsPile)

         
    }, [])


    const onCardPlayedHandler = (card) => {


    }





    return (
        <View style={styles.container}>
            <View style={{ flex: 0.35, backgroundColor: 'white'}}></View>

            <View style={{ flex: 1, backgroundColor: 'blue'}}>
                <SkitakallSetUp visibleCards={opponentVisibleCards} hiddenCards={opponentHiddenCards}></SkitakallSetUp>
            </View>

            <View style={{ flex: 1, backgroundColor: 'yellow', justifyContent: 'center'}}>
                <OpponentHand></OpponentHand>
            </View> 
            

            <View style={{ flex: 1.4, backgroundColor: 'red', justifyContent: 'center' }}>
                <Table drawCardsPile={drawCardsPile} playedCardsPile={playedCardsPile}></Table>
            </View> 

            
            <View style={{ flex: 1, backgroundColor: 'yellow', justifyContent: 'center'}}>
                <PlayerHand hand={myHand} onClick={onCardPlayedHandler}></PlayerHand>
            </View>

            <View style={{ flex: 1, backgroundColor: 'blue', justifyContent: 'center'}}>
                <SkitakallSetUp visibleCards={myVisibleCards} hiddenCards={myHiddenCards}></SkitakallSetUp>
            </View>

            <View style={{ flex: 0.6, backgroundColor: 'white' }}></View> 
        </View>
    );
}

export default SkitakallGame;
