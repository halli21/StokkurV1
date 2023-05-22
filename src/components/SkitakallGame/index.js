import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';


const _ = require('lodash');

import createNewGame from "../../utils/generateSkitakall";
import SkitakallView from '../../views/SkitakallView';
import GameOver from '../../views/GameOver';

import Spinner from '../Spinner';

const suitValues = {
    'C': { value: 1 },
    'D': { value: 2 },
    'H': { value: 3 },
    'S': { value: 4 },
};


const SkitakallGame = ({socket, name, room, user, numPlayers}) => {

    const [gameSetUp, setGameSetUp] = useState(false)
    const [readyToStart, setReadyToStart] = useState(false)
    const [playersReady, setPlayersReady] = useState(0)


    const [gameOver, setGameOver] = useState(false)
    const [winner, setWinner] = useState('')
    const [turn, setTurn] = useState('')

    const [player1HiddenCards, setPlayer1HiddenCards] = useState([]);
    const [player1VisibleCards, setPlayer1VisibleCards] = useState([null, null, null]);
    const [player1Hand, setPlayer1Hand] = useState([]);

    const [player2HiddenCards, setPlayer2HiddenCards] = useState([]);
    const [player2VisibleCards, setPlayer2VisibleCards] = useState([null, null, null]);
    const [player2Hand, setPlayer2Hand] = useState([]);

    const [drawCardsPile, setDrawCardsPile] = useState([]);
    const [playedCardsPile, setPlayedCardsPile] = useState([]);

    const [selectedCardList, setSelectedCardList] = useState([]);

    const [readyForSwitch, setReadyForSwitch] = useState({ card: { id: '', rank: 0, suit: '', selected: false, hidden: false }, place: '' });

    useEffect(() => {
        // Only one player needs to initalize game
        if (user === 'Player 1') {
        
            const initGame = createNewGame();

            socket.emit("initGame", {
                room: room,
                turn: initGame.turn,
            
                player1HiddenCards: initGame.player1HiddenCards,
                player1VisibleCards: initGame.player1VisibleCards,
                player1Hand: initGame.player1Hand,

                player2HiddenCards: initGame.player2HiddenCards,
                player2VisibleCards: initGame.player2VisibleCards,
                player2Hand: initGame.player2Hand,

                drawCardsPile: initGame.drawCardsPile,
            })
        }
    }, [])



    useEffect(() => {
        socket.on("initGameState", (data) => {

            const sortedPlayer1 = sortCards(data.player1Hand);
            const sortedPlayer2 = sortCards(data.player2Hand);

            setSelectedCardList([]);
            setTurn(data.turn)

            setPlayer1HiddenCards(data.player1HiddenCards)
            setPlayer1VisibleCards(data.player1VisibleCards)
            setPlayer1Hand(sortedPlayer1)

            setPlayer2HiddenCards(data.player2HiddenCards)
            setPlayer2VisibleCards(data.player2VisibleCards)
            setPlayer2Hand(sortedPlayer2)
            
            setPlayedCardsPile([])
            setDrawCardsPile(data.drawCardsPile)
        })


        socket.on("updateGameState", (data) => {

            const sortedPlayer1 = sortCards(data.player1Hand);
            const sortedPlayer2 = sortCards(data.player2Hand);

            setSelectedCardList([]);

            setGameOver(data.gameOver)
            setWinner(data.winner)
            setTurn(data.turn)
      
            setPlayer1HiddenCards(data.player1HiddenCards)
            setPlayer1VisibleCards(data.player1VisibleCards)
            setPlayer1Hand(sortedPlayer1)

            setPlayer2HiddenCards(data.player2HiddenCards)
            setPlayer2VisibleCards(data.player2VisibleCards)
            setPlayer2Hand(sortedPlayer2)
            
            setPlayedCardsPile(data.playedCardsPile)
            setDrawCardsPile(data.drawCardsPile)
        })


        socket.on("playerReady", (data) => {
            setPlayersReady(data.playersReady)
            if (data.playersReady == 2) {
                setGameSetUp(true);
            }
        })
         
    }, [])


    const update = (params) => {
        const {
            updateRoom = room,
            updateGameOver = gameOver,
            updateWinner = winner,
            updateTurn = turn,
            updatePlayer1HiddenCards = player1HiddenCards,
            updatePlayer1VisibleCards = player1VisibleCards,
            updatePlayer1Hand = player1Hand,
            updatePlayer2HiddenCards = player2HiddenCards,
            updatePlayer2VisibleCards = player2VisibleCards,
            updatePlayer2Hand = player2Hand,
            updatePlayedCardsPile = playedCardsPile,
            updateDrawCardsPile = drawCardsPile,
        } = params;
      
        const results = checkWinner(updatePlayer1Hand, updatePlayer2Hand);
      
        socket.emit("updateGame", {
            room: room,
            gameOver: results.gameOver,
            winner: results.winner,
            turn: updateTurn,
        
            player1HiddenCards: [...updatePlayer1HiddenCards],
            player1VisibleCards: [...updatePlayer1VisibleCards],
            player1Hand: [...updatePlayer1Hand],
        
            player2HiddenCards: [...updatePlayer2HiddenCards],
            player2VisibleCards: [...updatePlayer2VisibleCards],
            player2Hand: [...updatePlayer2Hand],
        
            playedCardsPile: [...updatePlayedCardsPile],
            drawCardsPile: [...updateDrawCardsPile],
        });
    };


    const readyToPlay = () => {
        setReadyToStart(true);
        socket.emit("signalReady", {
            room: room,
            playersReady: playersReady + 1,
        })
    }

    const checkWinner = (updatedPlayer1Hand, updatedPlayer2Hand) => {
        const player1VisibleEmpty = (player1VisibleCards[0] === null && player1VisibleCards[1] === null && player1VisibleCards[2] === null);
        const player1HiddenEmpty = (player1HiddenCards.length === 0);
        if (updatedPlayer1Hand.length === 0 && player1VisibleEmpty && player1HiddenEmpty) {
            setGameOver(true)
            return {gameOver : true, winner : name};;
        }

        const player2VisibleEmpty = (player2VisibleCards[0] === null && player2VisibleCards[1] === null && player2VisibleCards[2] === null);
        const player2HiddenEmpty = (player2HiddenCards.length === 0);
        if (updatedPlayer2Hand.length === 0 && player2VisibleEmpty && player2HiddenEmpty) {
            setGameOver(true)
            return {gameOver : true, winner : name};;
        }
        return {gameOver : false, winner : ''};
    }



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


    const removeCardsFromHand = (played_card, myHand) => {
        const newHand = [...myHand];
        let playedMany = handleSelected(played_card);
        
        for (let i = 0; i < playedMany.length; i++) {
            const cardIndex = newHand.indexOf(playedMany[i]);
            newHand.splice(cardIndex, 1);
        }
        const cardIndex = newHand.indexOf(played_card);
        const removed = newHand.splice(cardIndex, 1);
        return newHand;
    }


    const fillHand = (myHand) => {
        const newHand = [...myHand];
        while (newHand.length < 3 && drawCardsPile.length !== 0) {
            const newCard = drawCardsPile.splice(0, 1);
            newHand.push(newCard[0]);
        }
        return newHand;
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
        if (gameSetUp === false) { 
            const result = handleSwitches(card);
            return result;
        }

        if (user !== turn) {
            return;
        }

        let myHand;
       
        if (user === 'Player 1') {
            myHand = player1Hand;
        } 
        else if (user === 'Player 2') {
            myHand = player2Hand;
        }

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

        if (selectedCardList.length > 0) {
            let inSelected = false;
            for (let i = 0; i < selectedCardList.length; i++) {
                if (selectedCardList[i] === card) {
                    inSelected = true;
                    break;
                }
            }
     
            if (selectedCardList[0].rank === card.rank && !inSelected) {
                selectedCardList.push(card);
            }
            else if (!inSelected) {
                return 'fail';
            }
           
        }
    
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
                return 'bomb';
            }
            else if (valid || (card.rank == 2) || (card.rank == 5) || (card.rank == 9)){
                return 'valid';
            }
        }
        // First card to be placed on empty
        else {
            const placingStack = (selectedCardList.length === 4);

            if (card.rank == 10 || placingStack) {
                return 'bomb';
            }
            else {
                return 'valid';
            }
        }
        return 'fail';
    }


    const onDrawnCardPlayed = () => {
        if (user !== turn || gameSetUp === false || selectedCardList.length > 0) {
            return;
        }

        const played_card = drawCardsPile.splice(0, 1);    
        const result = onCardPlayedHandler(played_card[0]);
        if (result === 'fail') {
            onDeckPickup(played_card[0]);
        }
        else if (result === 'bomb') {
            update({ updatePlayedCardsPile: []});
        }
        else if (result === 'valid') {
            if (user === 'Player 1') {
                update({ updateTurn: 'Player 2', updatePlayedCardsPile: [...playedCardsPile, played_card[0]]});
            }
            else if (user === 'Player 2') {
                update({ updateTurn: 'Player 1', updatePlayedCardsPile: [...playedCardsPile, played_card[0]]});
            }
        }
    }


    const onDeckPickup = (failed=null) => {
        if (user !== turn || gameSetUp === false || selectedCardList.length > 0) {
            return;
        }

        let newHand;
        let myHand;
        let setMyHand;
       
        if (user === 'Player 1') {
            myHand = player1Hand;
            setMyHand = setPlayer1Hand;

        } 
        else if (user === 'Player 2') {
            myHand = player2Hand;
            setMyHand = setPlayer2Hand;
        }

        // If the deck needs to be picked up because of a failed placement then also add it to hand
        if (failed) {
            newHand = [...myHand, ...playedCardsPile, failed];
        }
        else {
            newHand = [...myHand, ...playedCardsPile];
        }
        
        setMyHand(newHand);
        setPlayedCardsPile([])

        if (user === 'Player 1') {
            update({ updatePlayer1Hand: newHand, updatePlayedCardsPile: []});
        }
        else if (user === 'Player 2') {
            update({ updatePlayer2Hand: newHand, updatePlayedCardsPile: []});
        }
    }



    const onHandCardPlayed = (played_card) => {
        if (user !== turn || gameSetUp === false) {
            return;
        }

        let myHand;
        let setMyHand;
       
        if (user === 'Player 1') {
            myHand = player1Hand;
            setMyHand = setPlayer1Hand;

        } 
        else if (user === 'Player 2') {
            myHand = player2Hand;
            setMyHand = setPlayer2Hand;
        }

        const result = onCardPlayedHandler(played_card);


        if (result === 'fail') {
            return;
        }

    
        let newHand = removeCardsFromHand(played_card, myHand);

        if (newHand.length < 3 && drawCardsPile.length !== 0) {
            newHand = fillHand(newHand);
        }

        setMyHand(sortCards(newHand));

        let newPlayedCardsPile;
        if (selectedCardList.length > 1) {
            newPlayedCardsPile = [...playedCardsPile, ...selectedCardList]
        }
        else {
            newPlayedCardsPile = [...playedCardsPile, played_card]
        }

        setPlayedCardsPile(newPlayedCardsPile);


        if (result === 'bomb') {
            // No turn switch, played disappears
            if (user === 'Player 1') {
                update({ updatePlayer1Hand: newHand, updatePlayedCardsPile: []});
            }
            else if (user === 'Player 2') {
                update({ updatePlayer2Hand: newHand, updatePlayedCardsPile: []});
            }
        }
        else if (result === 'valid') {
            // Normal placement of hand card
            if (user === 'Player 1') {
                update({ updateTurn: 'Player 2', updatePlayer1Hand: newHand, updatePlayedCardsPile: newPlayedCardsPile});
            }
            else if (user === 'Player 2') {
                update({ updateTurn: 'Player 1', updatePlayer2Hand: newHand, updatePlayedCardsPile: newPlayedCardsPile});
            }
        }
    }

    


    const onTableCardPlayed = (played_card) => {
        if (user !== turn || gameSetUp === false) {
            return;
        }

        let myHand;
        let myVisibleCards;
        let setMyVisibleCards;
 
        if (user === 'Player 1') {
            myHand = player1Hand;
            myVisibleCards = player1VisibleCards;
            setMyVisibleCards = setPlayer1VisibleCards; 
        } 
        else if (user === 'Player 2') {
            myHand = player2Hand;
            myVisibleCards = player2VisibleCards;
            setMyVisibleCards = setPlayer2VisibleCards;
        }
    
        if (myHand.length !== 0 || drawCardsPile.length !== 0) {
            console.log('Other cards no finished')
            return;
        }

        const result = onCardPlayedHandler(played_card); 
        const cardIndex = myVisibleCards.indexOf(played_card);
        myVisibleCards[cardIndex] = null;    


        if (result === 'fail') {
            onDeckPickup(played_card);
        }
        else if (result === 'bomb') {
            setMyVisibleCards(myVisibleCards)

            if (user === 'Player 1') {
                update({ updatePlayer1VisibleCards: myVisibleCards, updatePlayedCardsPile: []});
            }
            else if (user === 'Player 2') {
                update({ updatePlayer2VisibleCards: myVisibleCards, updatePlayedCardsPile: []});
            }
        }
        else if (result === 'valid') {
            setMyVisibleCards(myVisibleCards)
            setPlayedCardsPile([...playedCardsPile, played_card]);

            if (user === 'Player 1') {
                update({ updateTurn: 'Player 2', updatePlayer1VisibleCards: myVisibleCards, updatePlayedCardsPile: [...playedCardsPile, played_card]});
            }
            else if (user === 'Player 2') {
                update({ updateTurn: 'Player 1', updatePlayer2VisibleCards: myVisibleCards, updatePlayedCardsPile: [...playedCardsPile, played_card]});
            }
        }
    }


    const onHiddenCardPlayed = (played_card) => {
        if (user !== turn || gameSetUp === false) {
            return;
        }

        let myHand;
        let myVisibleCards;
        let myHiddenCards;
        let setMyHiddenCards;

        if (user === 'Player 1') {
            myHand = player1Hand;
            myVisibleCards = player1VisibleCards;
            myHiddenCards = player1HiddenCards;
            setMyHiddenCards = setPlayer1HiddenCards; 

        } 
        else if (user === 'Player 2') {
            myHand = player2Hand;
            myVisibleCards = player2VisibleCards;
            myHiddenCards = player2HiddenCards;
            setMyHiddenCards = setPlayer2HiddenCards; 
        }
        
        if (myHand.length !== 0 || drawCardsPile.length !== 0 || myVisibleCards[0] !== null || myVisibleCards[1] !== null || myVisibleCards[2] !== null) {
            console.log('Other cards no finished')
            return;
        }

        const result = onCardPlayedHandler(played_card);
        const cardIndex = myHiddenCards.indexOf(played_card);
        myHiddenCards.splice(cardIndex, 1); 


        if (result === 'fail') {
            onDeckPickup(played_card);
        }
        else if (result === 'bomb') {
            setMyHiddenCards(myHiddenCards)

            if (user === 'Player 1') {
                update({ updatePlayer1HiddenCards: myHiddenCards, updatePlayedCardsPile: []});
            }
            else if (user === 'Player 2') {
                update({ updatePlayer2HiddenCards: myHiddenCards, updatePlayedCardsPile: []});
            }
        }
        else if (result === 'valid') {
            setMyHiddenCards(myHiddenCards)
            setPlayedCardsPile([...playedCardsPile, played_card]);

            if (user === 'Player 1') {
                update({ updateTurn: 'Player 2', updatePlayer1HiddenCards: myHiddenCards, updatePlayedCardsPile: [...playedCardsPile, played_card]});
            }
            else if (user === 'Player 2') {
                update({ updateTurn: 'Player 1', updatePlayer2HiddenCards: myHiddenCards, updatePlayedCardsPile: [...playedCardsPile, played_card]});
            }
        }
    }




    const handleSwitches = (selectedCard) => {

        let hand;
        let visibleCards;

        if (user === 'Player 1') {
            hand = player1Hand;
            visibleCards = player1VisibleCards;

        } 
        else if (user === 'Player 2') {
            hand = player2Hand;
            visibleCards = player2VisibleCards;
        }

        // Check if in hand
        let inHand = false;
        for (let i = 0; i < hand.length; i++) {
            if (hand[i] === selectedCard) {
                inHand = true;
                break;
            }
        }
        // Check if in visible
        let inVisibleCards = false;
        for (let i = 0; i < visibleCards.length; i++) {
            if (visibleCards[i] === selectedCard) {
                inVisibleCards = true;
                break;
            }
        }

        if (!inHand && !inVisibleCards) {
            return false;
        }
    

        if (readyForSwitch.card.id !== '' && readyForSwitch.place !== '') {
            if (readyForSwitch.card.id === selectedCard.id) {
                setReadyForSwitch({card: { id: '', rank: 0, suit: '', selected: false, hidden: false }, place: ''});
                return true;
            }
            else {
                if (inHand && readyForSwitch.place === 'H') {
                    return false;
                }
                else if (inVisibleCards && readyForSwitch.place === 'V') {
                    return false;
                }
                
                if (inHand) {
                    const handIndex = hand.indexOf(selectedCard);
                    const visibleIndex = visibleCards.indexOf(readyForSwitch.card);
                    hand[handIndex] = readyForSwitch.card;
                    visibleCards[visibleIndex] = selectedCard;
                    setReadyForSwitch({card: { id: '', rank: 0, suit: '', selected: false, hidden: false }, place: ''});
                }
                else {
                    const handIndex = hand.indexOf(readyForSwitch.card);
                    const visibleIndex = visibleCards.indexOf(selectedCard);
                    hand[handIndex] = selectedCard;
                    visibleCards[visibleIndex] = readyForSwitch.card;
                    setReadyForSwitch({card: { id: '', rank: 0, suit: '', selected: false, hidden: false }, place: ''});
                }

                if (user === 'Player 1') {
                    update({  updatePlayer1Hand: hand, updatePlayer1VisibleCards: visibleCards });
                } 
                else if (user === 'Player 2') {
                    update({  updatePlayer2Hand: hand, updatePlayer2VisibleCards: visibleCards });
                }
                return true;

            }

        }
        else {
            if (inHand) {
                setReadyForSwitch({card : selectedCard, place : 'H'});
            }
            else if (inVisibleCards){
                setReadyForSwitch({card : selectedCard, place : 'V'});
            }
            return true;
        }

    }



    return (
        <View>
            {gameOver && (
                <GameOver socket={socket} winner={winner}></GameOver>
            )}

            {!readyToStart && (
                <TouchableOpacity style={styles.readyButtonContainer} onPress={() => { readyToPlay(); }} >
                    <View style={styles.readyButton}>
                        <Text style={styles.readyText}>Ready</Text>
                    </View>
                </TouchableOpacity>
            )}

            {(readyToStart && !gameSetUp) && (
                <View style={styles.waitingTextContainer}>
                    <Text style={styles.waitText}>Waiting for other players</Text>
                    <View style={styles.readySpinner}><Spinner/></View>
                </View>

            )}


            {user == 'Player 1' && (
                <SkitakallView
                    gameSetUp={gameSetUp}

                    user={user}
                    turn={turn}

                    myHand={player1Hand}
                    myVisibleCards={player1VisibleCards}
                    myHiddenCards={player1HiddenCards}
                    
                    opponentHand={player2Hand}
                    opponentVisibleCards={player2VisibleCards}
                    opponentHiddenCards={player2HiddenCards}

                    drawCardsPile={drawCardsPile}
                    playedCardsPile={playedCardsPile}

                    onHandCardPlayed={onHandCardPlayed}
                    onCardSelectedHandler={onCardSelectedHandler}
                    onTableCardPlayed={onTableCardPlayed}
                    onHiddenCardPlayed={onHiddenCardPlayed}
                    onDrawnCardPlayed={onDrawnCardPlayed}
                    onDeckPickup={onDeckPickup}
                />
            )}
           
            {user == 'Player 2' && (
                <SkitakallView
                    gameSetUp={gameSetUp}

                    user={user}
                    turn={turn}

                    myHand={player2Hand}
                    myVisibleCards={player2VisibleCards}
                    myHiddenCards={player2HiddenCards}
                    
                    opponentHand={player1Hand}
                    opponentVisibleCards={player1VisibleCards}
                    opponentHiddenCards={player1HiddenCards}

                    drawCardsPile={drawCardsPile}
                    playedCardsPile={playedCardsPile}

                    onHandCardPlayed={onHandCardPlayed}
                    onCardSelectedHandler={onCardSelectedHandler}
                    onTableCardPlayed={onTableCardPlayed}
                    onHiddenCardPlayed={onHiddenCardPlayed}
                    onDrawnCardPlayed={onDrawnCardPlayed}
                    onDeckPickup={onDeckPickup}
                />
            )}
        </View>
    );
}

export default SkitakallGame;
