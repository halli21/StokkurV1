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
    logIn: {
        flexDirection: 'row',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 10,
    },
    inputName: {
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
    }
   
});
