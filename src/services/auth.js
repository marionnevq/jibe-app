import jwtDecode from "jwt-decode";
import http from "./http";

export function register( 
    firstname, 
    lastname, 
    email, 
    username, 
    password, 
    image) {
  return http.post("/register/info", { 
    firstname, 
    lastname, 
    email, 
    username, 
    password, 
    image });
}

export function login(username, password) {
  return http.post("/login", { username, password });
}

export function logout() {
  localStorage.removeItem("accessToken");
}

export function getAccessToken() {
  return localStorage.getItem("accessToken");
}

export function getCurrentUser() {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    const decoded = jwtDecode(accessToken);
    return decoded.user;
  }
  return null;
}
