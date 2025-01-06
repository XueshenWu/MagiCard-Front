import components from "./components/components"
import views from "./views/views"

export default {
    legacy: false,
    locale: 'cn',
    fallbackLocale: 'en',
    messages: {
        cn: {
            message:{
                ...components.cn.message,
                ...views.cn.message
            }
        },
        en:{
            message:{
                ...components.en.message,
                ...views.en.message
            }
        }
    }
}