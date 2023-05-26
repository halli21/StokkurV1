import { NativeModules } from "react-native";
const { ScaleToFill, ScaleAspectFit, ScaleAspectFill } = (NativeModules.RNFLAnimatedImageManager || {});
export const MODES = {
    stretch: ScaleToFill,
    contain: ScaleAspectFit,
    cover: ScaleAspectFill
};
//# sourceMappingURL=typedefs.js.map