import configButton from "./configButton";
import NavBar from "./NavBar";
import FeatureBoardX from "./FeatureBoardX";
import SubscribeButton from "./SubscribeButton";

export default {
    cn: {
        message: {
            ...configButton.cn.message,
            ...NavBar.cn.message,
            ...FeatureBoardX.cn.message,
            ...SubscribeButton.cn.message
        }
    },
    en: {
        message: {
            ...configButton.en.message,
            ...NavBar.en.message,
            ...FeatureBoardX.en.message,
            ...SubscribeButton.en.message
        }
    }
}