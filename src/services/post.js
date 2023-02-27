import http from "./http";

export function getPost(postId) {
  return http.get(`/posts/${postId}`);
}
