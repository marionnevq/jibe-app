import jwtDecode from "jwt-decode";
import http from "./http";

export function register(
  firstname,
  lastname,
  email,
  username,
  password,
  imageUrl,
  bio
) {
  return http.post("/auth/register", {
    firstname,
    lastname,
    username,
    email,
    password,
    imageUrl,
    bio,
  });
}

export function login(email, password) {
  console.log("Hello login");
  return http.post("/auth/authenticate", { email, password });
}

export function getAccessToken() {
  return localStorage.getItem("accessToken");
}

export function getCurrentUser() {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    const decoded = jwtDecode(accessToken);
    console.log(decoded);
    return decoded.user;
  }
  return null;
}
//getUser-me

export function getUser() {
  const user = http.get("/users/me");
  return user;
}

//getUsers-search

export function searchUsers(searchQuery) {
  const user = http.get(`/profiles/${searchQuery}/search`);
  return user;
}

//getUser-visit
export function fetchUserByUsername(username) {
  const user = http.get(`/profiles/${username}`);
  return user;
}
