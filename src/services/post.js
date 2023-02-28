import http from "./http";

export function getWorldPost() {
  return http.post(`/posts`);
}

export function getFollowingPost() {
    return http.post("/posts/following");
  }
