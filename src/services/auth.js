import http from "./http";

export function register( 
    firstname, 
    lastname,
    email, 
    username, 
    password, 
    imageUrl,
    bio, ) {
          return http.post("/auth/register", { 
            firstname, 
            lastname,
            username, 
            email,
            password, 
            imageUrl,
            bio  });
          }

export function login(email, password) {
  console.log("Hello login")
  return http.post("/auth/authenticate", { email, password });
}

export function getAccessToken() {
  return localStorage.getItem("accessToken");
}

// export function getCurrentUser() {
//   const accessToken = localStorage.getItem("accessToken");
//   if (accessToken) {
//     const decoded = jwtDecode(accessToken);
//     return decoded.user;
//   }
//   return null;
// }
