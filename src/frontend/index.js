
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';

import RegistrationPage from './pages/RegistrationPage';
import HomePage from './pages/HomePage';
import CreateEventPage from './pages/CreateEventPage';
import HelpPage from './pages/HelpPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from "./pages/LoginPage";
import {checkAuthentication, redirectIfLoggedIn} from "./services/NavigationGuards";

Vue.use(VueRouter);

export const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/register',
            component: RegistrationPage,
            beforeEnter: redirectIfLoggedIn
        },
        {
            path: '/login',
            component: LoginPage,
            beforeEnter: redirectIfLoggedIn
        },
        {
            path: '/',
            component: HomePage,
            beforeEnter: checkAuthentication
        },
        {
            path: '/event/create',
            component: CreateEventPage,
            beforeEnter: checkAuthentication
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