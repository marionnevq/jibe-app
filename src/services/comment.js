import http from "./http";

export function getComments(postId) {
  return http.get(`/posts/${postId}/comments`);
}

export function addComment(postId, comment) {
  console.log(`/posts/${postId}/comments`, comment);
  return http.post(`/posts/${postId}/comments`, comment);
}

export function updateComment(commentId, value) {
  return http.put(`/comments/update/${commentId}`, { value });
}

export function deleteComment(commentId) {
  return http.delete(`/comments/${commentId}`);
}
