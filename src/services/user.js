import http from "./http";

export function getCurrentUser() {
  return http.get("/users/me");
}

export function updateCurrentUser(user) {
  return http.put("/profiles/update", user);
}

export function getFollowList(username) {
  return http.get(`/follow/${username}`);
}

export function getRandomUsers(count, userID) {
  return http.get(`/profiles/random/${count}/${userID}`);
}
