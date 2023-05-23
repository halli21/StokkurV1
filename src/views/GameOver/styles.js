
import { StyleSheet, Dimensions, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');
const pixelRatio = PixelRatio.get();

const rem = 16; 
const em = rem * pixelRatio;


export default StyleSheet.create({

    gameOverOverlay: {
        position: 'absolute',
        zIndex: 2,
        alignSelf: 'center',
        top: height * 0.27,
        width: width * 0.9,
        paddingBottom: width * 0.3,
        borderRadius: 50,
        borderWidth: 1,
        backgroundColor: 'white'
    },
    winnerText: {
        fontSize: 40,
        alignSelf: "center",
    },
    winnerSubText: {
        fontSize: 18,
        alignSelf: "center",
    },
    backText: {
        fontSize: 20,
    },
    loadButton: {
        alignSelf: 'center',
        padding: 5,
        width: width * 0.3,
        borderColor: "black",
        borderWidth: 1,
        borderTopWidth: 1.5,
        borderLeftWidth: 2,
        borderRadius: 8,
        alignItems: 'center',
        position:'absolute',
        bottom: height * 0.05
    },
    trophy: {
        alignSelf: 'center',
        resizeMode: 'contain',
        width: 0.35 * width,
        height: 0.4 * width,
    },

});