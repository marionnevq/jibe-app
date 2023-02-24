import http from "./http";

let user = null;

export function getCurrentUserAPI() {
  return http.get("/users/me");
}

export function setCurrentUser(user) {
  this.user = user;
}

export function getCurrentUser() {
  return this.user;
}

export function updateCurrentUser(user) {
  this.user = { ...this.user, ...user };
}
