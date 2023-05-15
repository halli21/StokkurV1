import { StyleSheet, Dimensions, PixelRatio} from 'react-native';


const { width, height } = Dimensions.get('window');
const pixelRatio = PixelRatio.get();

const rem = 16; 
const em = rem * pixelRatio;


export default StyleSheet.create({

    container: {
        flexDirection: 'column',
        alignItems: 'stretch',
        height: height * 1,
        
    }, 
    joinGame: {
        flexDirection: 'row',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 10,
    },
    inputCode: {
        paddingVertical: width * 0.03,
        paddingLeft: width * 0.05,
        fontSize: width * 0.05,
        width: width * 0.5
    }, 
    inputButton: {
        borderRadius: 5,
        justifyContent: 'center',
        borderColor: 'black',
        borderWidth: 0.5,
        padding: 10,
    },
    createButton: {
        borderColor: 'black',
        borderWidth: 2,
        padding: 5,
        borderRadius: 10,
        marginBottom: height * 0.02
    },
    buttonText: {
        fontSize: width * 0.08,
        paddingHorizontal: width * 0.07
    },
    psText: {
        position: 'absolute',
        bottom: 25,
        opacity: 0.5
    }
});
