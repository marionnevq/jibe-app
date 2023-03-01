import http from "./http";


export function getPost(postId) {
  return http.get(`/posts/${postId}`);
}

export function getWorldPost() {
  return http.get(`/posts`);
}


export function getFollowingPost() {
    return http.post(`/posts/following`);
  }

  export function getUserPosts(username) {
    return http.get(`/profiles/${username}/posts`);
  }
