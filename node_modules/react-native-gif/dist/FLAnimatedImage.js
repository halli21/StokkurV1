import React, { Component } from "react";
import { Platform, Image, requireNativeComponent } from "react-native";
import { MODES } from "./typedefs";
class FLAnimatedImage extends Component {
    render() {
        if (Platform.OS === "android")
            return React.createElement(Image, Object.assign({}, this.props));
        const contentMode = MODES[this.props.resizeMode || "contain"];
        const source = Image.resolveAssetSource(this.props.source) || {
            uri: undefined,
            width: undefined,
            height: undefined
        };
        const src = source.uri;
        return (React.createElement(RNFLAnimatedImage, Object.assign({}, this.props, { src: src, contentMode: contentMode })));
    }
}
FLAnimatedImage.defaultProps = {
    resizeMode: "contain"
};
const RNFLAnimatedImage = requireNativeComponent("RNFLAnimatedImage");
export default FLAnimatedImage;
//# sourceMappingURL=FLAnimatedImage.js.map