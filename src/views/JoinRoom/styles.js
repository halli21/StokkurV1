
import { StyleSheet, Dimensions, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');
const pixelRatio = PixelRatio.get();

const rem = 16; 
const em = rem * pixelRatio;


export default StyleSheet.create({

    joinViewOverlay: {
        position: 'absolute',
        zIndex: 2,
        alignSelf: 'center',
        top: height * 0.27,
        height: height * 0.5,
        width: width * 0.8,
        paddingHorizontal: width * 0.25,
        paddingBottom: width * 0.3,
        borderRadius: 20,
        borderWidth: 1,
        backgroundColor: 'white'
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
    gameList: {
        position: 'absolute',
        height: height * 0.37,
        width: width * 0.8,
        borderRadius: 20,
        //backgroundColor: 'green',
    },
    gameButton: {
        alignSelf: 'center',
        borderWidth: 1,
        paddingHorizontal: width * 0.175,
        paddingVertical: height * 0.01,
        borderRadius: 8,
        backgroundColor: 'white',
    },
    option: {
        paddingVertical: height * 0.02,
    },
    heading: {
        width: width,
        padding: height * 0.05
    }

});