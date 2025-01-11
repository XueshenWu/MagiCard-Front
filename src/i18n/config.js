import components from "./components/components"
import views from "./views/views"
import extra from "./extra/extra";

const config = {
    legacy: false,
    locale: 'cn',
    fallbackLocale: 'en',
    messages: {
        cn: {
            message:{
                ...components.cn.message,
                ...views.cn.message,
                ...extra.cn.message
            }
        },
        en:{
            message:{
                ...components.en.message,
                ...views.en.message,
                ...extra.en.message
            }
        }
    }
}



export default config;