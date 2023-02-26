import {
  Alert,
  createTheme,
  CssBaseline,
  Snackbar,
  ThemeProvider,
} from "@mui/material";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import LoginSwiper from "./components/LoginSwiper";
import FeedPage from "./pages/FeedPage";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Onboarding from "./pages/Onboarding";
import { useState } from "react";
import { getAccessToken, login, register } from "./services/auth";

function App() {
  const theme = createTheme({
    palette: {
      type: "light",
      primary: {
        main: "#eb4660",
      },

      typography: {
        fontFamily: ["montserrat", "poppins"],
      },

      secondary: {
        main: "#2c3568",
      },
    },
  });

  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("error");
  const [accessToken, setAccessToken] = useState(getAccessToken());
  const navigate = useNavigate();

  const handleRegister = async (event, form) => {
    event.preventDefault();
    try {
      const response = await register(
        form.firstname,
        form.lastname,
        form.email,
        form.username,
        form.password,
        form.imageUrl,
        form.bio
      )
        .then(() => {
          alert("Registration successful");
          navigate("/login");
        })
        .catch((err) => {
          const msg = err.response.data;
          setErrorMessage(msg);
          setOpen(true);
        });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message);
      }
    }
  };

  const handleLogin = async (form) => {
    try {
      const response = await login(form.email, form.password).catch((err) => {
        const msg = err.response.data;
        setErrorMessage(msg);
        setOpen(true);
      });

      localStorage.setItem("accessToken", response.data.token);
      setAccessToken(response.data.token);
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
    setAccessToken(null);

    navigate("/login");
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/onboarding"
          element={
            accessToken ? (
              <Onboarding onLogout={handleLogout} />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />

        <Route
          path="/register"
          element={
            accessToken ? (
              <FeedPage onLogout={handleLogout} />
            ) : (
              <Register handleSubmit={handleRegister} />
            )
          }
        />

        <Route
          path="/feed"
          element={
            accessToken ? (
              <FeedPage onLogout={handleLogout} />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />

        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default App;
