import { Component } from "react";
import { FLAnimatedImageProps } from "./typedefs";
declare class FLAnimatedImage extends Component<FLAnimatedImageProps> {
    static defaultProps: {
        resizeMode: string;
    };
    render(): JSX.Element;
}
export default FLAnimatedImage;
