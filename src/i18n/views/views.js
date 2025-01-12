import Home from "./Home";
import Cards from "./Cards";
import InviteRecord from "./InviteRecord";
import Subscription from "./Subscription";
import OpenCard from "./OpenCard";

export default {
    cn: {
        message: {
            ...Home.cn.message,
            ...Cards.cn.message,
            ...InviteRecord.cn.message,
            ...Subscription.cn.message,
            ...OpenCard.cn.message
        }
    },
    en: {
        message: {
            ...Home.en.message,
            ...Cards.en.message,
            ...InviteRecord.en.message,
            ...Subscription.en.message,
            ...OpenCard.en.message
        }
    }
}