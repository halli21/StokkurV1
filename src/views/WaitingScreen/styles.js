import { StyleSheet, Dimensions, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');
const pixelRatio = PixelRatio.get();

const rem = 16; 
const em = rem * pixelRatio;


export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadText: {
        alignSelf: "center",
        marginBottom: height * 0.02,
        fontSize: 18,

    },
    loadHeader: {
        fontSize: 30,
        marginBottom: 0.7 * rem,
        fontWeight: 'bold',
        alignSelf: "center",
        marginBottom: 3 * rem,

    },
    loadButton: {
        position: 'absolute',
        bottom: height * 0.15,
        alignSelf: 'center',
        padding: 5,
        width: width * 0.3,
        borderColor: "black",
        borderWidth: 1,
        borderTopWidth: 1.5,
        borderLeftWidth: 2,
        borderRadius: 8,
        alignItems: 'center',
        
    },
    backText: {
        fontSize: 20,
    },


});
