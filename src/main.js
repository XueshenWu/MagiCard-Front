import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import './style.css'
import App from './App.vue'
import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'
import i18nConfig from './i18n/config'



import Cards from './views/Cards.vue'
import Subscriptions from './views/Subscriptions.vue'
import Home from './views/Home.vue'
import NotFound from './views/NotFound.vue'
import OpenCard from './views/OpenCard.vue'
import Record from './views/Record.vue'
import InviteRecord from './views/InviteRecord.vue'
import { Crisp } from 'crisp-sdk-web'



import chatbotConfig from './utils/chatbotConfig'
// import { Crisp } from './cws/src'

const routes = [
    { path: "/", component: Home },
    { path: '/cards', component: Cards },
    { path: "/subscriptions", component: Subscriptions },
    { path: '/openCard', component: OpenCard },
    { path: "/record", component: Record },
    { path: '/invite-record', component: InviteRecord },
    { path: '/:pathMatch(.*)*', redirect: '/' }

]

export const router = createRouter({
    history: createWebHistory(),
    routes
})


export const i18n = createI18n(i18nConfig)

Crisp.configure(chatbotConfig.WEB_ID, chatbotConfig.Option)


createApp(App)
    .use(i18n)
    .use(router)
    .mount('#app')

