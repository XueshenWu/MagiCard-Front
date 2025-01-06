import layout from "./layout/layout";
import loginRegister from "./login-register/login-register";
import PhoneNumberInput from "./PhoneNumberInput";
import myCard from "./my-card/my-card";
import transactionRecord from "./transaction-record/transaction-record";

export default {
    cn: {
        message: {
            ...layout.cn.message,
            ...loginRegister.cn.message,
            ...PhoneNumberInput.cn.message,
            ...myCard.cn.message,
            ...transactionRecord.cn.message

        }
    },
    en: {
        message: {
            ...layout.en.message,
            ...loginRegister.en.message,
            ...PhoneNumberInput.en.message,
            ...myCard.en.message,
            ...transactionRecord.en.message
        }
    }
}