import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import styles from "./styles";



const LogIn = ({setName, giveName}) => {


    return (
        <View style={styles.container}>

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <View style={styles.logIn}>
                    <TextInput
                        style={styles.inputName}
                        placeholder={"Enter Your Name"}
                        onChangeText={(text) => {setName(text);}}
                    />
                    <TouchableOpacity style={styles.inputButton} onPress={giveName}>
                        <Text>Enter</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default LogIn;