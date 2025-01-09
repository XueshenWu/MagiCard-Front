import ApplyMonthlyStatements from "./ApplyMonthlyStatements";
import Feedback from "./Feedback";
import ModifyEmail from "./ModifyEmail";
import ResetCheckoutPassword from "./ResetCheckoutPassword";


export default {
    cn: {
        message: {
            ...ApplyMonthlyStatements.cn.message,
            ...Feedback.cn.message,
            ...ModifyEmail.cn.message,
            ...ResetCheckoutPassword.cn.message
        }
    },
    en: {
        message: {
            ...ApplyMonthlyStatements.en.message,
            ...Feedback.en.message,
            ...ModifyEmail.en.message,
            ...ResetCheckoutPassword.en.message
        }
    }
}