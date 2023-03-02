import http from "./http";

export function getNotifications() {
  return http.get("/notification/me");
}

export function deleteNotification(id) {
  return http.delete(`/notification/${id}`);
}
