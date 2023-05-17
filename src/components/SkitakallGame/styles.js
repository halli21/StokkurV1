import { StyleSheet, Dimensions, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');
const pixelRatio = PixelRatio.get();

const rem = 16; 
const em = rem * pixelRatio;


export default StyleSheet.create({
    readyButtonContainer: {
        position: 'absolute',
        alignSelf: 'center',
        top: height * 0.53,
        zIndex: 9999,
    },
    readyButton: {
        padding: 5,
        width: width * 0.5,
        borderColor: "black",
        borderWidth: 1,
        borderTopWidth: 1.5,
        borderLeftWidth: 2,
        borderRadius: 8,
        alignItems: 'center',
        backgroundColor: '#E6E6E6'
    },
    readyText: {
        fontSize: width * 0.06,
        fontWeight: '400'
    },

    waitingTextContainer: {
        position: 'absolute',
        alignSelf: 'center',
        top: height * 0.575,
        zIndex: 9999,
    },
    readySpinner: {
        alignSelf: "flex-end",
        marginRight: -2 * rem,
        marginTop: -1.1 * rem,
    }
})