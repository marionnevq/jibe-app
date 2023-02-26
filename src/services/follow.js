import http from "./http";

export function followUser(followerID, followeeUsername) {
  return http.post("/follow", { followerID, followeeUsername });
}
