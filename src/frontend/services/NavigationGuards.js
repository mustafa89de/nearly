import AuthService from "./AuthService";

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
