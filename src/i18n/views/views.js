import Home from "./Home";
import Cards from "./Cards";
import InviteRecord from "./InviteRecord";


export default {
    cn: {
        message: {
            ...Home.cn.message,
            ...Cards.cn.message,
            ...InviteRecord.cn.message
        }
    },
    en: {
        message: {
            ...Home.en.message,
            ...Cards.en.message,
            ...InviteRecord.en.message
        }
    }
}