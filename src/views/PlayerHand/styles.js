import { StyleSheet, Dimensions, PixelRatio} from 'react-native';


const { width, height } = Dimensions.get('window');
const pixelRatio = PixelRatio.get();

const rem = 16; 
const em = rem * pixelRatio;


export default StyleSheet.create({

    handContainer: {
        //paddingTop: 1 * rem,
        backgroundColor: 'green'

    },
    smallHand: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    cardContainer: {
        marginHorizontal: 0.3 * rem,
    }
});