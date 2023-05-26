
import { View, ScrollView } from 'react-native';
import styles from "./styles";

import Card from '../../components/Card';


const OpponentHand = ({hand}) => {

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
                        draggable={false}
                    />
                </View>
            ))}
   
        </View>
    
    );
}

export default OpponentHand;
