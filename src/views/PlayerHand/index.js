
import { View, ScrollView } from 'react-native';
import styles from "./styles";

import Card from '../../components/Card';


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
    ];

    const isLargeHand = hand.length > 4;


    return (
        <View style={styles.handContainer}>

            {!isLargeHand ? (

                <View style={styles.smallHand}>
                    {hand.map((card) => (
                        <View key={card.id} >
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
                </View>    
            ) : (
                <ScrollView horizontal={true} style={styles.largeHand}>
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
            )}
        </View>
    
    );
}

export default PlayerHand;