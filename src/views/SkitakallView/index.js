import { View, Dimensions } from 'react-native';
import styles from './styles';

const { width, height } = Dimensions.get('window');

import SkitakallSetUp from '../../views/SkitakallSetUp';
import Table from '../../views/Table';
import PlayerHand from '../../views/PlayerHand';
import OpponentHand from '../../views/OpponentHand';


const SkitakallView = ({gameSetUp, user, turn, myHand, myVisibleCards, myHiddenCards, opponentHand, opponentVisibleCards, opponentHiddenCards, drawCardsPile, playedCardsPile, onHandCardPlayed, onCardSelectedHandler, onTableCardPlayed, onHiddenCardPlayed, onDrawnCardPlayed, onDeckPickup}) => {


    return (
        <View style={styles.container}>
            <View style={{ flex: 0.35, backgroundColor: 'white', width: width}}></View>

            <View style={{ flex: 1, backgroundColor: 'white'}}>
                <SkitakallSetUp 
                    visibleCards={opponentVisibleCards} 
                    hiddenCards={opponentHiddenCards} 
                    visibleHandler={() => console.log("Do nothing, not your card")}
                    hiddenHandler={() => console.log("Do nothing, not your card")}
                    selectCard={onCardSelectedHandler}

                />
            </View>

            <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center'}}>
                <OpponentHand 
                    hand={opponentHand}
                />
            </View> 
            

            <View style={{ flex: 1.4, backgroundColor: 'white', justifyContent: 'center' }}>
                {gameSetUp && (
                    <Table
                        user={user}
                        turn={turn}
                        
                        drawCardsPile={drawCardsPile} 
                        playedCardsPile={playedCardsPile} 
                        drawHandler={onDrawnCardPlayed}
                        pickUpHandler={onDeckPickup}
                        selectCard={onCardSelectedHandler}
                    />
                )}
            </View> 

            
            <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center'}}>
                <PlayerHand 
                    hand={myHand} 
                    playedHandler={onHandCardPlayed} 
                    selectCard={onCardSelectedHandler}
                />
            </View>

            <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center'}}>
                <SkitakallSetUp 
                    visibleCards={myVisibleCards} 
                    hiddenCards={myHiddenCards} 
                    visibleHandler={onTableCardPlayed}
                    hiddenHandler={onHiddenCardPlayed}
                    selectCard={onCardSelectedHandler}
                />
            </View>

            <View style={{ flex: 0.6, backgroundColor: 'white' }}></View> 
        </View>
    );
}

export default SkitakallView;