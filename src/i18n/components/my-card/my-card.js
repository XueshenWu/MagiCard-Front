import CardDetail from "./CardDetail";
import CardHelp from "./CardHelp";
import CardHistory from "./CardHistory";
import CardOptionButton from "./CardOptionButton";
import CashoutButton from "./CashoutButton";
import InviteBanner from "./InviteBanner";
import RechargeButton from "./RechargeButton";

const myCard = {
    cn: {
       message:{
            ...CardDetail.cn.message,
            ...CardHelp.cn.message,
            ...CardHistory.cn.message,
            ...CardOptionButton.cn.message,
            ...CashoutButton.cn.message,
            ...InviteBanner.cn.message,
            ...RechargeButton.cn.message
       }
    },
    en: {
        message: {
            ...CardDetail.en.message,
            ...CardHelp.en.message,
            ...CardHistory.en.message,
            ...CardOptionButton.en.message,
            ...CashoutButton.en.message,
            ...InviteBanner.en.message,
            ...RechargeButton.en.message
        }
    }

}

console.log(myCard);

export default myCard;