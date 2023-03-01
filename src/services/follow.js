import http from "./http";

export function followUser() {
  return http.post("/follow");
}
