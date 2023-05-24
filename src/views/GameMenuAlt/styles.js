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
    menuButton: {
        borderColor: 'black',
        borderWidth: 2,
        padding: 5,
        borderRadius: 10,
        marginBottom: height * 0.02,
        width: width * 0.63,
    },
    buttonText: {
        fontSize: width * 0.08,
        paddingHorizontal: width * 0.07,
        alignSelf: 'center'
    },
    psText: {
        position: 'absolute',
        bottom: 100,
        opacity: 0.5
    },
    notification: {
        position: 'absolute',
        borderColor: 'black',
        borderWidth: 2,
        padding: 5,
        paddingHorizontal: 12,
        borderRadius: 50,
        backgroundColor: '#FF3B3B'
    },
    count: {
        fontSize: 20,
        fontWeight: '500'
    },
    inboxContainer: {
        //backgroundColor: 'green',
        paddingHorizontal: width * 0.03,
        paddingTop: width * 0.03
    }
});
