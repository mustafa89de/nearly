
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';

import RegistrationPage from './pages/RegistrationPage';
import HelpPage from './pages/HelpPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from "./pages/LoginPage";

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: RegistrationPage
        },
        {
            path: '/login',
            component: LoginPage
        },
        {
            path: '/help',
            component: HelpPage
        },
        {
            path: '*',
            component: NotFoundPage
        }
    ]
});

new Vue({
    el: '#app',
    render: h => h(App),
    router
});