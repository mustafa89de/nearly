import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';

import RegistrationPage from './pages/RegistrationPage';
import CreateEventPage from './pages/CreateEventPage';
import EventDetailPage from './pages/EventDetailPage';
import UserDetailPage from './pages/UserDetailPage';
import EditEventPage from './pages/EditEventPage';
import MyProfilePage from './pages/MyProfilePage';
import EditProfilePage from './pages/EditProfilePage';
import HelpPage from './pages/HelpPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from "./pages/LoginPage";
import OfflinePage from "./pages/OfflinePage";
import {
  checkAuthentication,
  checkAuthenticationAndRedirectToMyProfile,
  redirectIfLoggedIn,
  checkAuthenticationAndSubscription
} from "./services/NavigationGuards";
import EventOverviewPage from "./pages/EventOverviewPage";
import smoothscroll from 'smoothscroll-polyfill';
import SWService from "./services/SWService";

Vue.use(VueRouter);

smoothscroll.polyfill();
SWService.init();

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
      beforeEnter: checkAuthenticationAndSubscription
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
      beforeEnter: checkAuthenticationAndRedirectToMyProfile
    },
    {
      path: '/event/:eid/edit',
      component: EditEventPage,
      beforeEnter: checkAuthentication
    },
    {
      path: '/me',
      component: MyProfilePage,
      beforeEnter: checkAuthentication
    },
    {
      path: '/me/edit',
      component: EditProfilePage,
      beforeEnter: checkAuthentication
    },
    {
      path: '/help',
      component: HelpPage
    },
    {
      path: '/offline',
      component: OfflinePage
    },
    {
      path: '/404',
      component: NotFoundPage
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (navigator && !navigator.onLine && to.path !== '/offline') {
    next('/offline');
  } else {
    next();
  }
});

new Vue({
  el: '#app',
  render: h => h(App),
  router
});