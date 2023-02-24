import { createTheme, CssBaseline, Paper, ThemeProvider } from '@mui/material';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import LoginSwiper from './components/LoginSwiper';
import FeedPage from './pages/FeedPage';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import Onboarding from "./pages/Onboarding";
import { useEffect, useState } from 'react';
import { getAccessToken, login } from './services/auth';
import useLocalStorage from 'use-local-storage';

function App() {
  
  const [theme, setTheme] = useLocalStorage("theme", "dark")

  useEffect(() => {
    console.log(theme);
  })
  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme)
  }
  // const lightTheme = createTheme({
  //   palette: {
  //     mode: "light",
  //     type: "dark",
  //     primary: {
  //       main: "#2C3568", //dark blue
  //     },
  //     secondary:{
  //       main: "#EB4660", //bright pink
  //     },
  //     tertiary:{
  //       main: "#EEE8DB", //cream
  //     },
  //     white:{
  //       main: "#F2F2F2", //white
  //     },
  //     typography: {
  //       fontFamily:["montserrat", "poppins"],
  //     }
  //   }
  // });
  const [accessToken, setAccessToken] = useState(getAccessToken());
  const navigate = useNavigate();

  const handleLogin = async(form) => {
    try {
       const response = await login(form.email, form.password);
       localStorage.setItem("accessToken", response.data.token);
       const token = localStorage.getItem("accessToken");
       console.log(token);
       setAccessToken(response.data.token);
      
       console.log("state token", accessToken);
       navigate("/onboarding");
      
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message);
      }
    }
  };

  const handleLogout = () => {
    console.log(accessToken);
    localStorage.removeItem("accessToken")
    setAccessToken(null);
    
    navigate("/login")
  }

  return (
   
  // <ThemeProvider theme={lightTheme}>
     <>
      <CssBaseline />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route
            path="/login"
            element={ accessToken ? <Navigate to="/feed" /> : <Login onLogin={handleLogin} />}
          />
      
          <Route
            path="/onboarding"
            element={accessToken ? <Onboarding onLogout={handleLogout}/> : <Navigate to="/login" />}
          />

          <Route
            path="/register"
            element={accessToken? <Navigate to="/feed" /> : <Register />}
          />

          <Route
            path="/feed"
            element={accessToken? <FeedPage 
              onLogout={handleLogout}
              onSwitch={switchTheme}
              theme={theme}/> : <Navigate to="/login" />}
          />
          
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
      </>
    // </ThemeProvider>
  );
}

export default App;
