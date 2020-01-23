import AuthService from "./AuthService";
import PushService from "./PushService";

export function checkAuthentication(to, from, next) {
  if (AuthService.isAuthenticated()) {
    next();
  } else {
    next("/login");
  }
}

export function redirectIfLoggedIn(to, from, next) {
  if (AuthService.isAuthenticated()) {
    next('/');
  } else {
    next();
  }
}

export function checkAuthenticationAndRedirectToMyProfile(to, from, next) {
  if (AuthService.isAuthenticated()) {
    if(to.path === "/user/" + AuthService.getUser().userId){
      next("/me");
    } else {
      next();
    }
  } else {
    next("/login");
  }
}

export async function checkAuthenticationAndSubscription(to, from, next){
  if (AuthService.isAuthenticated()){
    await PushService.hasSubscribed();
    next()
  } else {
    next("/login")
  }
}
