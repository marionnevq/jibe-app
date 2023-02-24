import http from "./http";

export function getCurrentUser() {
  return http.get("/users/me");
}

export function updateCurrentUser(user) {
  return http.put("/profiles/update", user);
}
