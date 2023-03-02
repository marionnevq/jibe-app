import http from "./http";

export function getResetPasswordLink(email) {
  return http.post("/auth/request", email);
}

export function authPasswordChangeForm(token) {
  return http.get(`/auth/password/reset/${token}`);
}

export function saveNewPassword(token, password) {
  return http.put(
    "/auth/password/save",
    { password },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
}
