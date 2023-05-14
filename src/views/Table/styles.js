import { StyleSheet, Dimensions, PixelRatio} from 'react-native';


const { width, height } = Dimensions.get('window');
const pixelRatio = PixelRatio.get();

const rem = 16; 
const em = rem * pixelRatio;


export default StyleSheet.create({

    tableContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeHolder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'blue'
    },
    number: {
        textAlign: 'center',
        fontSize: 15,
        marginBottom: 5,
    },
    photo: {
        resizeMode: 'contain',
        width: 0.2 * width,
        height: 0.3 * width,
        borderRadius: 5,
    }

});
