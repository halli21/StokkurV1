import { StyleSheet, Dimensions, PixelRatio } from 'react-native';



const { width, height } = Dimensions.get('window');
const pixelRatio = PixelRatio.get();

const rem = 16; 
const em = rem * pixelRatio;



export default StyleSheet.create({

    container: {
        flexDirection: 'column',
        alignItems: 'stretch',
        height: height * 1,
    }
});