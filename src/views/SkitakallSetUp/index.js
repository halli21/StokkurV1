
import { View } from 'react-native';
import styles from "./styles";

import Card from '../../components/Card';


const SkitakallSetUp = ({visibleCards, hiddenCards, playedHandler}) => {

    return (
        <View style={styles.tableCardsContainer}>
            <View style={styles.hidden}>
                {hiddenCards.map((card, y) => (
                    <Card
                        key={y}
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
                <View style={styles.firstCard}>
                    {visibleCards[0] !== null && (
                        <Card
                            id={visibleCards[0].id}
                            rank={visibleCards[0].rank}
                            suit={visibleCards[0].suit}
                            selected={visibleCards[0].selected}
                            hidden={false}
                            onClick={() => playedHandler(visibleCards[0])}
                        />
                    )}
                </View>

                <View style={styles.secondCard}>
                    {visibleCards[1] !== null && (
                        <Card
                            id={visibleCards[1].id}
                            rank={visibleCards[1].rank}
                            suit={visibleCards[1].suit}
                            selected={visibleCards[1].selected}
                            hidden={false}
                            onClick={() => playedHandler(visibleCards[1])}
                        />
                    )}
                </View>

                <View style={styles.thirdCard}>
                    {visibleCards[2] !== null && (
                        <Card
                            id={visibleCards[2].id}
                            rank={visibleCards[2].rank}
                            suit={visibleCards[2].suit}
                            selected={visibleCards[2].selected}
                            hidden={false}
                            onClick={() => playedHandler(visibleCards[2])}
                        />
                    )}
                </View>
                
            </View>
        </View>
      );
    };
    
    export default SkitakallSetUp;
