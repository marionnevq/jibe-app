import { async } from "q";
import { createContext, useState } from "react";
import { useNavigate } from "react-router";
import { login, register } from "../services/auth";

export const UserContext = createContext({
  accessToken: [],
  onLogin: () => {},
  onLogout: () => {},
  onRegister: () => {},
});

export const UserProvider = ({ children }) => {

  const [accessToken, setAccessToken] = useState([]);
  const navigate = useNavigate();

  const handleLogin = (form) => {
    try {
      const response = login(form.email, form.password);
      console.log(response.data.token);
      localStorage.setItem("accessToken", response.data.token);
      setAccessToken(response.data.token);
      
      accessToken !== null ? navigate("/onboarding") : navigate("/login")
      
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message);
      }
    }
  };

  const handleUpdateUser = async () => {
    try {
      
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message);
      }
    }
  }

  const handleRegister = (form) => {
      console.log("hello reg")
      try {
        console.log("hello reg")
        register( 
          form.firstname, 
          form.lastname, 
          form.email, 
          form.username, 
          form.password, 
          form.image,
          form.bio);
        alert("Registration successful");
        navigate("/login");
      } catch (error) {
        if (error.response && error.response.status === 400) {
          alert(error.response.data.message);
        }
      }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setAccessToken(null);
    navigate("/login");
  };

  return (
    <UserContext.Provider
      value={{
        accessToken: accessToken,
        onLogin: handleLogin,
        onRegister: handleRegister,
        onLogout: handleLogout,
        onUpdateUser: handleUpdateUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
