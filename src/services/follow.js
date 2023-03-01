import http from "./http";

export function followUser(followerID, followeeUsername) {
  return http.post("/follow", { followerID, followeeUsername });
}

export function checkFollowing(otherUsername) {
  return http.get(`/follow/check/${otherUsername}`);
}

export function unfollowUser(followerID, followeeUsername) {
  return http.delete("/follow", { data: { followerID, followeeUsername } });
}
