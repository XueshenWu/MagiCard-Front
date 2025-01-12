import CardDurationSelector from "./CardDurationSelector";
import ServiceSelection from "./ServiceSelection";
import UserInfoInput from "./UserInfoInput";
export default {

    cn: {
        message: {
            ...CardDurationSelector.cn.message,
            ...ServiceSelection.cn.message,
            ...UserInfoInput.cn.message
        }
    },
    en: {
        message: {
            ...CardDurationSelector.en.message,
            ...ServiceSelection.en.message,
            ...UserInfoInput.en.message
        }
    }

}