
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';

import RegistrationPage from './pages/RegistrationPage';
import CreateEventPage from './pages/CreateEventPage';
import HelpPage from './pages/HelpPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from "./pages/LoginPage";
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
            path: '/event/create',
            component: CreateEventPage
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
            path: '/event/create',
            component: CreateEventPage
        },
        {
            path: '/secured',
            component: RegistrationPage // Fake-page to be replaced
        },
        {
            path: '*',
            component: NotFoundPage
        }
    ]
});


router.beforeEach((to, from, next) => {
    try{
        if(to.path.includes('/secured') && !AuthService.isAuthenticated()){
            router.push("/login");
        }else next();
    }catch(err){
        console.error(err.message);
        throw err;
    }
})

new Vue({
    el: '#app',
    render: h => h(App),
    router
});