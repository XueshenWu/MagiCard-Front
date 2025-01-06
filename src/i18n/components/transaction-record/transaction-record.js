import RecordMetaDisplay from "./RecordMetaDisplay";
import RecordDataDisplay from "./RecordDataDisplay";

export default {
    cn: {
        message: {
            ...RecordMetaDisplay.cn.message,
            ...RecordDataDisplay.cn.message
        }
    },
    en: {
        message: {
            ...RecordMetaDisplay.en.message,
            ...RecordDataDisplay.en.message
        }
    }
}