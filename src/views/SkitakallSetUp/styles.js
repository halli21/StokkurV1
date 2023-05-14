import { StyleSheet, Dimensions, PixelRatio} from 'react-native';


const { width, height } = Dimensions.get('window');
const pixelRatio = PixelRatio.get();

const rem = 16; 
const em = rem * pixelRatio;


export default StyleSheet.create({

    tableCardsContainer: {
    
        //backgroundColor: 'green'

    },

    hidden: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        zIndex: 1,
        //backgroundColor: 'green'
        
    },
    visible: {
       
        zIndex: 2,
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        
    },
    card: {
        
    },
});
