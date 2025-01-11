import paymentPollingAddition from "./paymentPollingAddition";
import setLoginPassword from "./setLoginPassword";


export default {
    cn: {
        message:{
           ...paymentPollingAddition.cn.message,
           setLoginPassword:setLoginPassword.cn.message
        }
    },
    en:{
        message:{
            ... paymentPollingAddition.en.message,
            setLoginPassword:setLoginPassword.en.message
        }
    }
}