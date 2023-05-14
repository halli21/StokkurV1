
import { View, ScrollView } from 'react-native';
import styles from "./styles";

import Card from '../../components/Card';


import { deckOfCards } from '../../utils/deckOfCards.js';


const OpponentHand = () => {

    const randomIndex = Math.floor(Math.random() * deckOfCards.length);
    const randomCard = deckOfCards[randomIndex];
    const randomIndex2 = Math.floor(Math.random() * deckOfCards.length);
    const randomCard2 = deckOfCards[randomIndex2];
    const randomIndex3 = Math.floor(Math.random() * deckOfCards.length);
    const randomCard3 = deckOfCards[randomIndex3];

    const randomIndex4 = Math.floor(Math.random() * deckOfCards.length);
    const randomCard4 = deckOfCards[randomIndex4];
    const randomIndex5 = Math.floor(Math.random() * deckOfCards.length);
    const randomCard5 = deckOfCards[randomIndex5];
    const randomIndex6 = Math.floor(Math.random() * deckOfCards.length);
    const randomCard6 = deckOfCards[randomIndex6];

    const hand = [
        { id: randomCard.id, rank: randomCard.rank, suit: randomCard.suit, selected: randomCard.selected },
        { id: randomCard2.id, rank: randomCard.rank, suit: randomCard.suit, selected: randomCard.selected },
        { id: randomCard3.id, rank: randomCard.rank, suit: randomCard.suit, selected: randomCard.selected },
        
    ];


    return (
        <View style={styles.opponentHand}>
           
            {hand.map((card) => (
                <View key={card.id} >
                    <Card
                        id={card.id}
                        rank={card.rank}
                        suit={card.suit}
                        selected={card.selected}
                        hidden={true}
                        onSelect={() => console.log('clicked')}
                    />
                </View>
            ))}
   
        </View>
    
    );
}

export default OpponentHand;
