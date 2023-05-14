
import { View, Text, Image } from 'react-native';
import styles from "./styles";

import Card from '../../components/Card';
import blank from '../../resources/blank.png';

const Table = ({drawCardsPile, playedCardsPile, pickUpHandler}) => {

    const drawIsEmpty = drawCardsPile.length === 0;
    const playedIsEmpty = playedCardsPile.length === 0;

    const size = playedCardsPile.length;


    return (
        <View style={styles.tableContainer}>   
            <View style={styles.placeHolder}>
                <Text style={styles.number}>{drawCardsPile.length}</Text>

                {!drawIsEmpty ? (
                    <Card 
                        id={drawCardsPile[0].id} 
                        rank={drawCardsPile[0].rank}
                        suit={drawCardsPile[0].suit} 
                        selected={drawCardsPile[0].selected} 
                        hidden={true} 
                        onLongPress={() => console.log('selected')}
                    />    
                ) : (  
                    <View style={styles.outline}>
                        <Image 
                            style={styles.photo}
                            resizeMode="stretch"
                            defaultSource={blank}   
                            source={blank}
                        />
                    </View>
                )}  

            </View>


            <View style={styles.placeHolder}>
                <Text style={styles.number}>{playedCardsPile.length}</Text>
                
                {!playedIsEmpty ? (
                    <Card 
                        id={playedCardsPile[size - 1].id} 
                        rank={playedCardsPile[size - 1].rank} 
                        suit={playedCardsPile[size - 1].suit} 
                        selected={playedCardsPile[size - 1].selected} 
                        hidden={false}
                        onClick={() => pickUpHandler()}
                        onLongPress={() => console.log('deck')}
                    />  
                ) : (
                    <View style={styles.outline}>
                        <Image 
                            style={styles.photo}
                            resizeMode="stretch"
                            defaultSource={blank}   
                            source={blank}
                        />
                    </View>
                )}
                
            </View>
        </View>
    );
}

export default Table;
