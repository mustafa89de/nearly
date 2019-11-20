import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';

import RegistrationPage from './pages/RegistrationPage';
import HomePage from './pages/HomePage';
import CreateEventPage from './pages/CreateEventPage';
import EventDetailPage from './pages/EventDetailPage';
import UserDetailPage from './pages/UserDetailPage';
import EventEditPage from './pages/EventEditPage';
import MyProfilePage from './pages/MyProfilePage';
import HelpPage from './pages/HelpPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from "./pages/LoginPage";
import {checkAuthentication, redirectIfLoggedIn} from "./services/NavigationGuards";
import EventOverviewPage from "./pages/EventOverviewPage";

Vue.use(VueRouter);

import smoothscroll from 'smoothscroll-polyfill';

smoothscroll.polyfill();


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
      component: EventOverviewPage,
      beforeEnter: checkAuthentication
    },
    {
      path: '/links',
      component: HomePage,
      beforeEnter: checkAuthentication
    },
    {
      path: '/event/create',
      component: CreateEventPage,
      beforeEnter: checkAuthentication
    },
    {
      path: '/event/:eid',
      component: EventDetailPage,
      beforeEnter: checkAuthentication
    },
    {
      path: '/user/:uid',
      component: UserDetailPage,
      beforeEnter: checkAuthentication
    },
    {
      path: '/event/:eid/edit',
      component: EventEditPage,
      beforeEnter: checkAuthentication
    },
    {
      path: '/me',
      component: MyProfilePage,
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