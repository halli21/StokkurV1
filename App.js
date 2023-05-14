
import { View } from 'react-native';

import SkitakallGame from './src/components/SkitakallGame';

import SkitakallMenu from './src/views/SkitakallMenu';



export default function App() {

    return (
        <View>
            <SkitakallGame></SkitakallGame>
            <SkitakallMenu></SkitakallMenu>
        </View>
    );
}
