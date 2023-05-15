const _ = require('lodash');
import { deckOfCards } from "./deckOfCards";
import shuffleArray from "./shuffleArray";

export default function createNewGame() {
    const copyCards = _.cloneDeep(deckOfCards);
    const shuffledCards = shuffleArray(copyCards);
  
    const player1HiddenCards = shuffledCards.splice(0, 3);
    const player1VisibleCards = shuffledCards.splice(0, 3);
    const player1Hand = shuffledCards.splice(0, 3);
  
    const player2HiddenCards = shuffledCards.splice(0, 3);
    const player2VisibleCards = shuffledCards.splice(0, 3);
    const player2Hand = shuffledCards.splice(0, 3);
  
    const drawCardsPile = shuffledCards;
  
    const gameState = {
        gameOver: false,
        turn: 'Player 1',
  
        player1HiddenCards: [...player1HiddenCards],
        player1VisibleCards: [...player1VisibleCards],
        player1Hand: [...player1Hand],
    
        player2HiddenCards: [...player2HiddenCards],
        player2VisibleCards: [...player2VisibleCards],
        player2Hand: [...player2Hand],
    
        playedCardsPile: [],
        drawCardsPile: [...drawCardsPile],
    };
  
    return {
        turn: gameState.turn,
        player1HiddenCards: [...gameState.player1HiddenCards],
        player1VisibleCards: [...gameState.player1VisibleCards],
        player1Hand: [...gameState.player1Hand],
        player2HiddenCards: [...gameState.player2HiddenCards],
        player2VisibleCards: [...gameState.player2VisibleCards],
        player2Hand: [...gameState.player2Hand],
        drawCardsPile: [...gameState.drawCardsPile],
    };
  }
  