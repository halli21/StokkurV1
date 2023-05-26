import { ImageSourcePropType, ImageStyle } from "react-native";
export interface RNFLCoverModes {
    ScaleToFill: number;
    ScaleAspectFit: number;
    ScaleAspectFill: number;
}
export declare const MODES: {
    stretch: number;
    contain: number;
    cover: number;
};
export interface FLAnimatedImageProps {
    contentMode?: number;
    source: ImageSourcePropType;
    resizeMode?: keyof typeof MODES;
    style?: ImageStyle;
    onFrameChange?: () => void;
    onLoadEnd?: () => void;
}
