
import { View, ScrollView } from 'react-native';
import styles from "./styles";

import Card from '../../components/Card';



const PlayerHand = ({hand, playedHandler, selectCard}) => {

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
                                draggable={true}
                                onClick={() => playedHandler(card)}
                                onLongPress={() => console.log("PlayerHand")}
                                onLongPressHandler={{selectCard : selectCard, card : card}}

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
                                draggable={true}
                                onClick={() => playedHandler(card)}
                                onLongPress={() => console.log("PlayerHand")}
                                onLongPressHandler={{selectCard : selectCard, card : card}}

                            />
                        </View>
                    ))}
                </ScrollView>
            )}
        </View>
    
    );
}

export default PlayerHand;
