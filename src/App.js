import { Button, Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router-dom';
import FeedPage from './pages/FeedPage';
//import NavBar from './components/NavBar';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import ProfilePage from './pages/ProfilePage';
import Register from './pages/Register';

function App() {
  const theme = createTheme({
    palette: {
      type: "light",
      primary: {
        main: "#FC7704",
      },
      
      typography: {
        fontFamily:["montserrat", "poppins"]
      },
    
      secondary:{
        main: "#B70760",
      }
    }
  });
  return (
  <ThemeProvider theme={theme}>
      <CssBaseline />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/register"
            element={<Register />}
          />
          <Route
            path="/feed"
            element={<FeedPage />}
          />
           <Route
            path="/profile/:username"
            element={<ProfilePage />}
          />
          <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
    </ThemeProvider>
  );
}

export default App;
