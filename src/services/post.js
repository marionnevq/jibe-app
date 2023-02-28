import http from "./http";

export function getWorldPost() {
  return http.post(`/posts`);
}

export function getFollowingPost(followeeID, postID) {
  return http.post("/posts/following", { followeeID, postID });
}

export function getUserPosts(username) {
  return http.get(`/profiles/${username}/posts`);
}
