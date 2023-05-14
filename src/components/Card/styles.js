import { StyleSheet, Dimensions, PixelRatio } from 'react-native';


const { width, height } = Dimensions.get('window');
const pixelRatio = PixelRatio.get();

const rem = 16; 
const em = rem * pixelRatio;


export default StyleSheet.create({

    cardContainer: {
        //backgroundColor: 'green'
       
    },
    card: {
        resizeMode: 'contain',
        width: 0.2 * width,
        height: 0.3 * width,
    },
    hiddenCard: {
        borderRadius: 5,
        width: 0.2 * width,
        height: 0.3 * width,
    },
    selectedCard: {
        marginBottom: 1 * rem,
        marginTop: -1 * rem,
    }
    

})