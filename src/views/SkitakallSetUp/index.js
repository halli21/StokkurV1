
import { View } from 'react-native';
import styles from "./styles";

import Card from '../../components/Card/card';


import { deckOfCards } from '../../utils/deckOfCards.js';





const SkitakallSetUp = () => {

    const randomIndex = Math.floor(Math.random() * deckOfCards.length);
    const randomCard = deckOfCards[randomIndex];
    const randomIndex2 = Math.floor(Math.random() * deckOfCards.length);
    const randomCard2 = deckOfCards[randomIndex2];
    const randomIndex3 = Math.floor(Math.random() * deckOfCards.length);
    const randomCard3 = deckOfCards[randomIndex3];


    const underIndex = Math.floor(Math.random() * deckOfCards.length);
    const underCard = deckOfCards[underIndex];
    const underIndex2 = Math.floor(Math.random() * deckOfCards.length);
    const underCard2 = deckOfCards[underIndex2];
    const underIndex3 = Math.floor(Math.random() * deckOfCards.length);
    const underCard3 = deckOfCards[underIndex3];


    const hiddenCards = [
        { id: underCard.id, rank: randomCard.rank, suit: randomCard.suit, selected: randomCard.selected },
        { id: underCard2.id, rank: randomCard.rank, suit: randomCard.suit, selected: randomCard.selected },
        { id: underCard3.id, rank: randomCard.rank, suit: randomCard.suit, selected: randomCard.selected },
    ];
    
    const visibleCards = [
        { id: randomCard.id, rank: randomCard.rank, suit: randomCard.suit, selected: randomCard.selected },
        { id: randomCard2.id, rank: randomCard.rank, suit: randomCard.suit, selected: randomCard.selected },
        { id: randomCard3.id, rank: randomCard.rank, suit: randomCard.suit, selected: randomCard.selected },
    ];



    return (
        <View style={styles.tableCardsContainer}>
            <View style={styles.hidden}>
                {hiddenCards.map((card) => (
                    <Card
                        id={card.id}
                        rank={card.rank}
                        suit={card.suit}
                        selected={card.selected}
                        hidden={true}
                        onSelect={() => console.log('clicked')}
                    />
                ))}
            </View>

            <View style={styles.visible}>
                <View style={styles.card}>
                    {visibleCards[0] !== null && (
                        <Card
                            id={visibleCards[0].id}
                            rank={visibleCards[0].rank}
                            suit={visibleCards[0].suit}
                            selected={visibleCards[0].selected}
                            hidden={false}
                            onSelect={() => console.log('clicked')}
                        />
                    )}
                </View>

                <View style={styles.card}>
                    {visibleCards[1] !== null && (
                        <Card
                            id={visibleCards[1].id}
                            rank={visibleCards[1].rank}
                            suit={visibleCards[1].suit}
                            selected={visibleCards[1].selected}
                            hidden={false}
                            onSelect={() => console.log('clicked')}
                        />
                    )}
                </View>
                
            </View>

    
        </View>
      );
    };
    
    export default SkitakallSetUp;
