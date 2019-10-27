
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App';

import WelcomePage from './pages/WelcomePage';
import HelpPage from './pages/HelpPage';
import NotFoundPage from './pages/NotFoundPage';

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [
        { 
            path: '/', 
            component: WelcomePage 
        },
        { 
            path: '/help', 
            component: HelpPage 
        },
        {
            path :'*',
            component: NotFoundPage
        }
    ]
})

new Vue({
    el: '#app',
    render: h => h(App),
    router
})