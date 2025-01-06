import LoginButton from "./LoginButton";
import forms from "./forms/forms";
import Agreement from "./Agreement";

export default {
    cn: {
        message: {
            ...LoginButton.cn.message,
            ...forms.cn.message,
            ...Agreement.cn.message
        }
    },
    en: {
        message: {
            ...LoginButton.en.message,
            ...forms.en.message,
            ...Agreement.en.message
        }
    }
}