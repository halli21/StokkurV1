
import { View, Text } from 'react-native';
import styles from "./styles";


import Card from '../../components/Card';


import { deckOfCards } from '../../utils/deckOfCards.js';





const Table = () => {

    const randomIndex = Math.floor(Math.random() * deckOfCards.length);
    const randomCard = deckOfCards[randomIndex];
    const randomIndex2 = Math.floor(Math.random() * deckOfCards.length);
    const randomCard2 = deckOfCards[randomIndex2];


    return (
       
        <View style={styles.tableContainer}>   
            <View style={styles.placeHolder}>
                <Text style={styles.number}>34</Text>
                <Card id={randomCard.id} rank={randomCard.rank} suit={randomCard.suit} selected={randomCard.selected} hidden={false} onSelect={() => console.log("clicked")}></Card>                         
            </View>


            <View style={styles.placeHolder}>
                <Text style={styles.number}>0</Text>
                <Card id={randomCard2.id} rank={randomCard.rank} suit={randomCard.suit} selected={randomCard.selected} hidden={false} onSelect={() => console.log("clicked")}></Card>       
            </View>
        </View>
    );
}

export default Table;
