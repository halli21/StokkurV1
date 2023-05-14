
import { View, ScrollView } from 'react-native';
import styles from "./styles";

import Card from '../../components/Card/card';


import { deckOfCards } from '../../utils/deckOfCards.js';





const PlayerHand = () => {

    const randomIndex = Math.floor(Math.random() * deckOfCards.length);
    const randomCard = deckOfCards[randomIndex];
    const randomIndex2 = Math.floor(Math.random() * deckOfCards.length);
    const randomCard2 = deckOfCards[randomIndex2];
    const randomIndex3 = Math.floor(Math.random() * deckOfCards.length);
    const randomCard3 = deckOfCards[randomIndex3];


    const hand = [
        { id: randomCard.id, rank: randomCard.rank, suit: randomCard.suit, selected: randomCard.selected },
        { id: randomCard2.id, rank: randomCard.rank, suit: randomCard.suit, selected: randomCard.selected },
        { id: randomCard3.id, rank: randomCard.rank, suit: randomCard.suit, selected: randomCard.selected },
        { id: randomCard.id, rank: randomCard.rank, suit: randomCard.suit, selected: randomCard.selected },
        { id: randomCard2.id, rank: randomCard.rank, suit: randomCard.suit, selected: randomCard.selected },
        { id: randomCard3.id, rank: randomCard.rank, suit: randomCard.suit, selected: randomCard.selected },
    ];


    return (
        <View style={styles.scrollContainer}>
            <ScrollView horizontal={true} style={styles.playerHand}>
                {hand.map((card) => (
                    <View key={card.id} style={styles.cardContainer}>
                        <Card
                            id={card.id}
                            rank={card.rank}
                            suit={card.suit}
                            selected={card.selected}
                            hidden={false}
                            onSelect={() => console.log('clicked')}
                        />
                    </View>
                ))}
            </ScrollView>
        </View>
    
    );
}

export default PlayerHand;
