import http from "./http";

export function getPost(postId) {
  return http.get(`/posts/${postId}`);
}

export function getWorldPost() {
  return http.get(`/posts`);
}

export function getFollowingPost() {
    return http.get(`/posts/following`);
  }

export function createPost(post) {
  return http.post("/posts", post);

}

export function updatePost(postID, post) {
  return http.put(`/posts/update/${postID}`, {...post});
}

export function getUserPosts(username) {
  return http.get(`/profiles/${username}/posts`);
}

