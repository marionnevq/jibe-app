import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import LoginSwiper from './components/LoginSwiper';
import FeedPage from './pages/FeedPage';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import Onboarding from "./pages/Onboarding";
import { useState } from 'react';
import { getAccessToken, login } from './services/auth';

function App() {
  
  const theme = createTheme({
    palette: {
      type: "light",
      primary: {
        main: "#eb4660",
      },
      
      typography: {
        fontFamily:["montserrat", "poppins"]
      },

      secondary:{
        main: "#2c3568",
      }
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
    localStorage.removeItem("accessToken")
    setAccessToken(null);
    
    navigate("/login")
  }

  return (
   
  <ThemeProvider theme={theme}>
     
      <CssBaseline />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route
            path="/login"
            element={<Login onLogin={handleLogin}/>}
          />
      
          <Route
            path="/onboarding"
            element={accessToken ? <Onboarding onLogout={handleLogout}/> : <Login onLogin={handleLogin}/>}
          />

          <Route
            path="/register"
            element={accessToken? <FeedPage onLogout={handleLogout}/> : <Register />}
          />

          <Route
            path="/feed"
            element={accessToken? <FeedPage onLogout={handleLogout}/> : <Login onLogin={handleLogin}/>}
          />
          
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
    </ThemeProvider>
  );
}

export default App;
