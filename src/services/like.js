import http from "./http";

export function checkLiked(postId, userId) {
  return http.post("/likes/exist", { postId, userId });
}

export function createLike(postID, userID) {
  return http.post("/likes", { postID, userID });
}

export function removeLike(reactionID) {
  return http.delete(`/likes/${reactionID}`);
}

export function getLike(postID, userID) {
  return http.get(`/likes/${postID}/${userID}`);
}
