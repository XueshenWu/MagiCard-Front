import LoginButton from "./LoginButton";
import forms from "./forms/forms";
import Agreement from "./Agreement";
import LoginCard from "./LoginCard";
import CardContainer from "./CardContainer";

export default {
    cn: {
        message: {
            ...LoginButton.cn.message,
            ...forms.cn.message,
            ...Agreement.cn.message,
            ...LoginCard.cn.message,
            ...CardContainer.cn.message
        }
    },
    en: {
        message: {
            ...LoginButton.en.message,
            ...forms.en.message,
            ...Agreement.en.message,
            ...LoginCard.en.message,
            ...CardContainer.en.message
        }
    }
}