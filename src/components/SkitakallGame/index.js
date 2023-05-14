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



const suitValues = {
    'C': { value: 1 },
    'D': { value: 2 },
    'H': { value: 3 },
    'S': { value: 4 },
};



const SkitakallGame = () => {

    const [currentUser, setCurrentUser] = useState('')
    const [setting, setSetting] = useState(false);

    const [gameOver, setGameOver] = useState(false)
    const [winner, setWinner] = useState('')
    const [turn, setTurn] = useState('')

    const [myHand, setMyHand] = useState([]);
    const [myVisibleCards, setMyVisibleCards] = useState([null, null, null]);
    const [myHiddenCards, setMyHiddenCards] = useState([]);

    const [opponentHand, setOpponentHand] = useState([]);
    const [opponentVisibleCards, setOpponentVisibleCards] = useState([null, null, null]);
    const [opponentHiddenCards, setOpponentHiddenCards] = useState([]);

    const [drawCardsPile, setDrawCardsPile] = useState([]);
    const [playedCardsPile, setPlayedCardsPile] = useState([]);

    const [selectedCardList, setSelectedCardList] = useState([]);


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


        setMyHand(sortCards(myHand));
        setMyVisibleCards(myVisibleCards);
        setMyHiddenCards(myHiddenCards);

        setOpponentHand(opponentHand);
        setOpponentVisibleCards(opponentVisibleCards);
        setOpponentHiddenCards(opponentHiddenCards);

        setDrawCardsPile([])
        setPlayedCardsPile(playedCardsPile)

        setTurn('Player 1')

         
    }, [])


    const sortCards = (cards) => {
        cards.sort((a, b) => {
        
            if (a.rank < b.rank) {
                return -1;
            }
            else if (a.rank > b.rank) {
                return 1;
            }
            else {
                if (suitValues[a.suit].value < suitValues[b.suit].value) {
                    return -1;
                }
                else {
                    return 1;
                }
            }
        });
        return cards;
    }


    const getValueBelow9 = () => {
        const length = playedCardsPile.length;
        if (length > 1) {
            let i = 0;
            while (i < length) {
                const card = playedCardsPile[(length - i - 1)];
                let cardRank = card.rank;
                i++;
                if (cardRank !== 9) {
                    return cardRank;
                }
            }
        }
        return 2;
    }


    const check4InARow = (topCardRank) => {
        const length = playedCardsPile.length;

        let cardsAdded = 0;
        if (selectedCardList.length > 1) {
            cardsAdded = selectedCardList.length - 1;
        }

        if (length + cardsAdded < 3) {
            return false;
        }

        let i = 0;
        let end = 3 - cardsAdded;

        while (i < end) {
            const card = playedCardsPile[(length - i - 1)];
            let cardRank = card.rank;

            if (cardRank === 9 && topCardRank !== 9) {
                end++;
                if (length < end) {
                    return false;
                }
            }
            else if (cardRank !== topCardRank) {
                return false;
            }
            i++;
        }
        return true;
    }



    const handleBomb = (played_card) => {
        const newHand = [...myHand];
        let playedMany;

        if (selectedCardList.length > 1) {
            playedMany = handleSelected(played_card);
        }
    
        if (playedMany !== undefined) {
            for (let i = 0; i < playedMany.length; i++) {
                const cardIndex = newHand.indexOf(playedMany[i]);
                newHand.splice(cardIndex, 1);
            }
        }
        
        const cardIndex = newHand.indexOf(played_card);
      
        if (newHand.length <= 3 && drawCardsPile.length !== 0) {
            const newCard = drawCardsPile.splice(0, 1);
            newHand[cardIndex] = newCard[0];

            while (newHand.length < 3 && drawCardsPile.length !== 0) {
                const newCard = drawCardsPile.splice(0, 1);
                newHand.push(newCard[0]);
            }
        }
        else {
            newHand.splice(cardIndex, 1)
        }

        setMyHand(sortCards(newHand));
        setPlayedCardsPile([])    
    }



    const handleValidPlacement = (played_card) => {
        const newHand = [...myHand];
        let newPlayedCardsPile;
        let playedMany;

        if (selectedCardList.length > 1) {
            playedMany = handleSelected(played_card);
        }
    
        if (playedMany !== undefined) {
            for (let i = 0; i < playedMany.length; i++) {
                const cardIndex = newHand.indexOf(playedMany[i]);
                newHand.splice(cardIndex, 1);
            }
            newPlayedCardsPile = [...playedCardsPile, ...playedMany, played_card]
        }
        else {
            newPlayedCardsPile = [...playedCardsPile, played_card]
        }
        
        const cardIndex = newHand.indexOf(played_card);
        
        if (newHand.length <= 3 && drawCardsPile.length !== 0) {

            const newCard = drawCardsPile.splice(0, 1);
            newHand[cardIndex] = newCard[0];

            while (newHand.length < 3 && drawCardsPile.length !== 0) {
                const newCard = drawCardsPile.splice(0, 1);
                newHand.push(newCard[0]);
            }
        }
        else {
            newHand.splice(cardIndex, 1)
        }

        setMyHand(sortCards(newHand));
        setPlayedCardsPile(newPlayedCardsPile)
      


        /*
        if (!hiddenCard){
            if (cardPlayedBy == 'Player 1') {
                update({ updateTurn: 'Player 2', updatePlayer1Hand: newHand, updateCurrentCard: card, updatePlayedCardsPile: newPlayedCardsPile });
            }
            else if (cardPlayedBy == 'Player 2') {
                update({ updateTurn: 'Player 1', updatePlayer2Hand: newHand, updateCurrentCard: card, updatePlayedCardsPile: newPlayedCardsPile });
            }
        }
        else {
            if (cardPlayedBy == 'Player 1') {
                update({ updateTurn: 'Player 2', updateCurrentCard: card, updatePlayedCardsPile: newPlayedCardsPile });
                
            }
            else if (cardPlayedBy == 'Player 2') {
                update({ updateTurn: 'Player 1', updateCurrentCard: card, updatePlayedCardsPile: newPlayedCardsPile });
            }
        }
        */
    }



    const handleSelected = (played_card) => {
        let playedCards = [];
        for (let i = 0; i < selectedCardList.length; i++) {
            if (played_card !== selectedCardList[i]) {
                playedCards.push(selectedCardList[i])
            }
        }
        setSelectedCardList([]);
        return playedCards;
    }



    const sameRank = (selectedCard) => {
        if (selectedCardList.length === 0) {
            return true;
        }

        let isSameRank = true;
        const thisRank = selectedCard.rank;
        for (let i = 0; i < selectedCardList.length; i++) {
            const otherRank = selectedCardList[i].rank;
            if (otherRank !== thisRank) {
                isSameRank = false;
                break;
            }
        }
        return isSameRank;
    }



    const onCardSelectedHandler = (card) => {
        const validSelection = sameRank(card);

        let inSelectedCardList = false;
        for (let i = 0; i < selectedCardList.length; i++) {
            if (selectedCardList[i] === card) {
                inSelectedCardList = true;
                break;
            }
        }

        let inHand = false;
        for (let i = 0; i < myHand.length; i++) {
            if (myHand[i] === card) {
                inHand = true;
                break;
            }
        }
    
        if (validSelection && !inSelectedCardList && inHand) {
            selectedCardList.push(card)
            return true;
        }
        else if (inSelectedCardList){
            const cardIndex = selectedCardList.indexOf(card);
            const removed = selectedCardList.splice(cardIndex, 1);
            return true;
        }
        return false;
    } 



    const onCardPlayedHandler = (card) => {
    
        if (playedCardsPile.length > 0) {

            let valid = false;
            const currentCard = playedCardsPile[playedCardsPile.length - 1]

            // Get card below 9's if there are any
            let trueRank = currentCard.rank;

            if (currentCard.rank == 9) {
                trueRank = getValueBelow9();
            }
            // If current card is a 5 five then only valid if lower
            if (trueRank == 5) {
                valid = (trueRank >= card.rank)
            }
            else {
                valid = (trueRank <= card.rank)
            }
            // Check for 4 same rank in a row -> bomb
            const bomb = check4InARow(card.rank);

            const placingStack = (selectedCardList.length === 4);

            if (card.rank == 10 || bomb || placingStack) {
                handleBomb(card);
                return true;
            }
            else if (valid || (card.rank == 2) || (card.rank == 5) || (card.rank == 9)){
                handleValidPlacement(card);
                return true;
            }
        }
        // First card to be placed on empty
        else {
            const placingStack = (selectedCardList.length === 4);

            if (card.rank == 10 || placingStack) {
                handleBomb(card);
            }
            else {
                handleValidPlacement(card);
            }
            return true;
        }
        return false;
    }


    const onDrawnCardPlayed = () => {
        const played_card = drawCardsPile.splice(0, 1);    
        const valid = onCardPlayedHandler(played_card[0]);
        if (!valid) {
            onDeckPickup(played_card[0]);
        }
    }


    const onDeckPickup = (failed=null) => {
        // If the deck needs to be picked up because of a failed placement then also add it to hand
        if (failed) {
            newHand = [...myHand, ...playedCardsPile, failed];
        }
        else {
            newHand = [...myHand, ...playedCardsPile];
        }
        
        setMyHand(newHand);
        setPlayedCardsPile([])
    }


    const onTableCardPlayed = (played_card) => {
    
        if (myHand.length !== 0 || drawCardsPile.length !== 0) {
            return;
        }

        const valid = onCardPlayedHandler(played_card); 
        const cardIndex = myVisibleCards.indexOf(played_card);
        myVisibleCards[cardIndex] = null;    

        if (!valid) {
            onDeckPickup(played_card);
        }

        setMyVisibleCards(myVisibleCards)
    }


    const onHiddenCardPlayed = (played_card) => {
        
        if (myHand.length !== 0 || drawCardsPile.length !== 0 || myVisibleCards[0] !== null || myVisibleCards[1] !== null || myVisibleCards[2] !== null) {
            return;
        }

        const valid = onCardPlayedHandler(played_card);
        const cardIndex = myHiddenCards.indexOf(played_card);
        myHiddenCards.splice(cardIndex, 1); 

        if (!valid) {
            onDeckPickup(played_card);
        }

        setMyHiddenCards(myHiddenCards)
    }






    return (
        <View style={styles.container}>
            <View style={{ flex: 0.35, backgroundColor: 'white'}}></View>

            <View style={{ flex: 1, backgroundColor: 'blue'}}>
                <SkitakallSetUp 
                    visibleCards={opponentVisibleCards} 
                    hiddenCards={opponentHiddenCards} 
                    visibleHandler={() => console.log("Do nothing, not your card")}
                    hiddenHandler={() => console.log("Do nothing, not your card")}

                />
            </View>

            <View style={{ flex: 1, backgroundColor: 'yellow', justifyContent: 'center'}}>
                <OpponentHand 
                    hand={opponentHand}
                />
            </View> 
            

            <View style={{ flex: 1.4, backgroundColor: 'red', justifyContent: 'center' }}>
                <Table 
                    drawCardsPile={drawCardsPile} 
                    playedCardsPile={playedCardsPile} 
                    drawHandler={onDrawnCardPlayed}
                    pickUpHandler={onDeckPickup}
                />
            </View> 

            
            <View style={{ flex: 1, backgroundColor: 'yellow', justifyContent: 'center'}}>
                <PlayerHand 
                    hand={myHand} 
                    playedHandler={onCardPlayedHandler} 
                    selectCard={onCardSelectedHandler}
                />
            </View>

            <View style={{ flex: 1, backgroundColor: 'blue', justifyContent: 'center'}}>
                <SkitakallSetUp 
                    visibleCards={myVisibleCards} 
                    hiddenCards={myHiddenCards} 
                    visibleHandler={onTableCardPlayed}
                    hiddenHandler={onHiddenCardPlayed}
                    selectCard={onCardSelectedHandler}
                />
            </View>

            <View style={{ flex: 0.6, backgroundColor: 'white' }}></View> 
        </View>
    );
}

export default SkitakallGame;
