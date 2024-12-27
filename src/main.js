import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'

import Cards from './views/Cards.vue'
import Subscriptions from './views/Subscriptions.vue'
import Home from './views/Home.vue'
import NotFound from './views/NotFound.vue'


const routes = [
    { path: "/", component: Home },
    { path: '/cards', component: Cards },
    { path: "/subscriptions", component: Subscriptions },
    {path:'/:pathMatch(.*)*', redirect: '/'}

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

createApp(App).use(router).mount('#app')
