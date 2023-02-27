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
import ProfileVisitPage from './pages/ProfileVisitPage';

import { POSTS_DATA } from './Data/posts';
import ProfilePage from './pages/ProfilePage';

function App() {
  
  const [theme, setTheme] = useLocalStorage("theme", "dark")
  const [posts, setPosts] = useState(POSTS_DATA);


  useEffect(() => {
    console.log(theme);
  })

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme)
  }

  const themes = createTheme({
    palette: {
      type: "light",
      primary: {
        main: "#EB4660"
      },
      secondary: {
        main: "#2C3568"
      },
      tertiary: {
        main: "#ff5d75"
      },
    }
  });

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
    localStorage.removeItem("accessToken");
    localStorage.removeItem("theme");
    setAccessToken(null);
    setTheme("light");
    navigate("/login");
  }

  return (
   
  <ThemeProvider theme={themes}>
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
            path="/profile/visit/:username"
            element={accessToken ? <ProfileVisitPage /> : <Navigate to="/login" />}
          />

          <Route
            path="/profile/:username"
            element={accessToken ? <ProfileVisitPage /> : <Navigate to="/login" />}
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

          <Route
            path="/profile/:username"
            element={accessToken? <ProfilePage 
              onLogout={handleLogout}
              onSwitch={switchTheme}
              posts={posts}
              theme={theme}/> : <Navigate to="/login" />}
          />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
    </ThemeProvider>
  );
}

export default App;
