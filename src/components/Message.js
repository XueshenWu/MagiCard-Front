import { message as ant_message } from "ant-design-vue";
import MessageIcon from "./MessageIcon.vue";
import { h } from "vue";



export const message = {
    success: (content) => {
         ant_message.success({
            class:"text-[1vw]",
           icon:h(MessageIcon, { success: true, content }),
           content:" "
           
        });
    },
    error: (content) => {
        ant_message.error({
            class:"text-[1vw]",
            content: " ",
            icon: h(MessageIcon, { success: false, content }),
        })
    },
    info: (content) => {
        ant_message.info({
            class:"text-[1vw]",
            content: " ",
            icon: h(MessageIcon, { success: true, content }),
        })
    },
}