import http from "./http";

export function getUserPosts(username) {
    return http.get(`/profiles/${username}/posts`);
}