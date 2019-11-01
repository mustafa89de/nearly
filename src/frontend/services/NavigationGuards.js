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
