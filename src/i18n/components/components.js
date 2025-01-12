import layout from "./layout/layout";
import loginRegister from "./login-register/login-register";
import PhoneNumberInput from "./PhoneNumberInput";
import myCard from "./my-card/my-card";
import transactionRecord from "./transaction-record/transaction-record";
import subscription from "./subscription/subscription";
import CheckoutResult from "./CheckoutResult";
import configModalForms from "./configModalForms/configModalForms";
import openCard from "./open-card/openCard";

export default {
    cn: {
        message: {
            ...layout.cn.message,
            ...loginRegister.cn.message,
            ...PhoneNumberInput.cn.message,
            ...myCard.cn.message,
            ...transactionRecord.cn.message,
            ...subscription.cn.message,
            ...CheckoutResult.cn.message,
            ...configModalForms.cn.message,
            ...openCard.cn.message

        }
    },
    en: {
        message: {
            ...layout.en.message,
            ...loginRegister.en.message,
            ...PhoneNumberInput.en.message,
            ...myCard.en.message,
            ...transactionRecord.en.message,
            ...subscription.en.message,
            ...CheckoutResult.en.message,
            ...configModalForms.en.message,
            ...openCard.en.message
        }
    }
}