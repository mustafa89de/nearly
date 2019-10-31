
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';

import RegistrationPage from './pages/RegistrationPage';
import HelpPage from './pages/HelpPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from "./pages/LoginPage";
import {ENDPOINTS, ROUTES} from "./constants";
import AuthService from "./services/AuthService";

Vue.use(VueRouter);

export const router = new VueRouter({
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
            path: '/'+ ROUTES.SECURED,
            component: RegistrationPage // Fake-page to be replaced
        },
        {
            path: '*',
            component: NotFoundPage
        }
    ]
});


router.beforeEach((to, from, next) => {
    if(to.path.includes(ROUTES.SECURED) && !AuthService.isAuthenticated()){
        // TOKEN EXPERATION TO BE CHECKED
        router.push("/login");
    } else next();
})

new Vue({
    el: '#app',
    render: h => h(App),
    router
});