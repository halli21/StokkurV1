import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Image, PanResponder, Animated, Dimensions, findNodeHandle, UIManager } from "react-native";

import styles from "./styles";

const { width, height } = Dimensions.get('window');

const cards_images = {
    'AC': require("../../resources/AC.png"),
    'AD': require("../../resources/AD.png"),
    'AH': require("../../resources/AH.png"),
    'AS': require("../../resources/AS.png"),

    'KC': require("../../resources/KC.png"),
    'KD': require("../../resources/KD.png"),
    'KH': require("../../resources/KH.png"),
    'KS': require("../../resources/KS.png"),

    'QC': require("../../resources/QC.png"),
    'QD': require("../../resources/QD.png"),
    'QH': require("../../resources/QH.png"),
    'QS': require("../../resources/QS.png"),

    'JC': require("../../resources/JC.png"),
    'JD': require("../../resources/JD.png"),
    'JH': require("../../resources/JH.png"),
    'JS': require("../../resources/JS.png"),

    '10C': require("../../resources/10C.png"),
    '10D': require("../../resources/10D.png"),
    '10H': require("../../resources/10H.png"),
    '10S': require("../../resources/10S.png"),

    '9C': require("../../resources/9C.png"),
    '9D': require("../../resources/9D.png"),
    '9H': require("../../resources/9H.png"),
    '9S': require("../../resources/9S.png"),

    '8C': require("../../resources/8C.png"),
    '8D': require("../../resources/8D.png"),
    '8H': require("../../resources/8H.png"),
    '8S': require("../../resources/8S.png"),

    '7C': require("../../resources/7C.png"),
    '7D': require("../../resources/7D.png"),
    '7H': require("../../resources/7H.png"),
    '7S': require("../../resources/7S.png"),

    '6C': require("../../resources/6C.png"),
    '6D': require("../../resources/6D.png"),
    '6H': require("../../resources/6H.png"),
    '6S': require("../../resources/6S.png"),

    '5C': require("../../resources/5C.png"),
    '5D': require("../../resources/5D.png"),
    '5H': require("../../resources/5H.png"),
    '5S': require("../../resources/5S.png"),

    '4C': require("../../resources/4C.png"),
    '4D': require("../../resources/4D.png"),
    '4H': require("../../resources/4H.png"),
    '4S': require("../../resources/4S.png"),

    '3C': require("../../resources/3C.png"),
    '3D': require("../../resources/3D.png"),
    '3H': require("../../resources/3H.png"),
    '3S': require("../../resources/3S.png"),

    '2C': require("../../resources/2C.png"),
    '2D': require("../../resources/2D.png"),
    '2H': require("../../resources/2H.png"),
    '2S': require("../../resources/2S.png"),
};


const Card = ({ id, rank, suit, selected, hidden, draggable, onClick, onLongPress, onLongPressHandler}) => {

    const cardRef = useRef(null);

    const [isSelected, setIsSelected] = useState(selected);
    const [isHidden, setIsHidden] = useState(hidden);



    useEffect(() => {
        setIsSelected(false);
    }, [id]);


    const pan = useRef(new Animated.ValueXY()).current;


    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => draggable,
            onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y,}], { useNativeDriver: false }),
            onPanResponderRelease: (_, gesture) => {

                const leftThreshold = width * 0.5;
                const rightThreshold = width; 
                const bottomThreshold = height * 0.45;
                const topThreshold = height * 0.3;

    
                const handle = findNodeHandle(cardRef.current);
                UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
                    //console.log('Card position:', { x: pageX, y: pageY });
                    if (
                        pageX < rightThreshold &&
                        pageX > leftThreshold &&
                        pageY < bottomThreshold &&
                        pageY > topThreshold 
                    ) {
                        //console.log('Card landed in the played pile');
                    }
                });
                Animated.spring(pan, {
                    toValue: { x: 0, y: 0 },
                    useNativeDriver: false,
                }).start();
            },
        })
    ).current;



    const handleLongPress = () => {      
        if (!isHidden) {
            const changed = onLongPressHandler.selectCard(onLongPressHandler.card);
            if (changed) {
                setIsSelected(!isSelected);
                onLongPress && onLongPress(!isSelected);
            }
        }
    }

    
    let imageSource;
    if (isHidden) {
        imageSource = require('../../resources/card-back.png'); 
    } 
    else {
        imageSource = cards_images[id];
    }

    return (
        <TouchableOpacity onPress={onClick} onLongPress={handleLongPress}>
            <View style={ [styles.cardContainer, isSelected && styles.selectedCard] }>
                <Image source={imageSource} style={ isHidden ? styles.hiddenCard : styles.card } />
            </View>
        </TouchableOpacity>

    )
};

export default Card;