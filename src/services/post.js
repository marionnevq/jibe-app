import http from "./http";

export function getWorldPost() {
  return http.get(`/posts`);
}


export function getFollowingPost() {
    return http.post(`/posts/following`);
  }

