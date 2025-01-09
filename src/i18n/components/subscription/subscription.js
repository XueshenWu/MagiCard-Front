import SelectionBoard from "./SelectionBoard";
import CardRechargeBoard from "./CardRechargeBoard";

export default {
    cn:{
        message:{
            ...SelectionBoard.cn.message,
            ...CardRechargeBoard.cn.message
        }
    },
    en:{
        message:{
            ...SelectionBoard.en.message,
            ...CardRechargeBoard.en.message
        }
    }
}