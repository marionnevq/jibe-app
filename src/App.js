import {
  Alert,
  Box,
  createTheme,
  CssBaseline,
  Modal,
  Snackbar,
  ThemeProvider,
} from "@mui/material";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";

import EmailConfirmation from "./pages/EmailConfirmation";
import FeedPage from "./pages/FeedPage";
import ForgotPass from "./pages/ForgotPass";

import ProfileVisitPage from "./pages/ProfileVisitPage";
import Loading from "./images/loading1.gif";
import { POSTS_DATA } from "./Data/posts";
import ProfilePage from "./pages/ProfilePage";

import LatchList from "./pages/LatchList";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Onboarding from "./pages/Onboarding";
import PostPage from "./pages/PostPage";

import Register from "./pages/Register";
import { getAccessToken, login, register } from "./services/auth";

function App() {
  const [theme, setTheme] = useLocalStorage("theme", "light");
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("error");
  const [accessToken, setAccessToken] = useState(getAccessToken());
  const [loading, setLoading] = useState(false);
  const [severity, setSeverity] = useState("error");
  const navigate = useNavigate();

  useEffect(() => {
    console.log(theme);
  });

  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  const themes = createTheme({
    palette: {
      type: "light",
      primary: {
        main: "#EB4660",
      },

      secondary: {
        main: "#2C3568",
      },
      tertiary: {
        main: "#ff5d75",
      },
    },
  });

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    justofyContent: "center",
    alignItems: "center",
    marginLeft: "35px",
    pt: 1,
    pl: 1,
    pr: 1,
  };

  const handleRegister = async (event, form) => {
    event.preventDefault();

    try {
      setLoading(true);
      await register(
        form.firstname,
        form.lastname,
        form.email,
        form.username,
        form.password,
        form.imageUrl,
        form.bio
      )
        .then(() => {
          setSnackbarMessage("Registered Successfully");
          setSeverity("success");
          setLoading(false);
          setOpen(true);
          navigate("/login");
        })
        .catch((err) => {
          const msg = err.response.data;
          setSnackbarMessage(msg);
          setSeverity("error");
          setLoading(false);
          setOpen(true);
        });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message);
      }
      setLoading(false);
    }
  };

  const handleLogin = async (form) => {
    try {
      setLoading(true);
      await login(form.email, form.password)
        .then((response) => {
          localStorage.setItem("accessToken", response.data.token);
          setAccessToken(response.data.token);

          setSnackbarMessage("Logged In Successfully");
          setSeverity("success");
          setLoading(false);
          setOpen(true);
          navigate("/onboarding");
        })
        .catch((err) => {
          const msg = err.response.data;
          setSnackbarMessage(msg);
          setSeverity("error");
          setLoading(false);
          setOpen(true);
        });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message);
        setLoading(false);
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
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <ThemeProvider theme={themes}>
      <CssBaseline />
      <Modal open={loading}>
        <Box sx={style}>
          <img src={Loading} alt="Loading..." style={{ width: "30%" }} />
        </Box>
      </Modal>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/login"
          element={
            accessToken ? (
              <Navigate to="/feed" />
            ) : (
              <Login onLogin={handleLogin} setLoading={setLoading} />
            )
          }
        />
        <Route
          path="/onboarding"
          element={
            accessToken ? (
              <Onboarding onLogout={handleLogout} setLoading={setLoading} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/password/reset/:token"
          element={
            <ForgotPass
              setLoading={setLoading}
              setSnackbarMessage={setSnackbarMessage}
              setSeverity={setSeverity}
              setOpen={setOpen}
            />
          }
        />

        <Route
          path="/forgot"
          element={
            <EmailConfirmation
              setLoading={setLoading}
              setSnackbarMessage={setSnackbarMessage}
              setSeverity={setSeverity}
              setOpen={setOpen}
            />
          }
        />
        <Route
          path="/profile/visit/:username"
          element={
            accessToken ? (
              <ProfileVisitPage
                onLogout={handleLogout}
                onSwitch={switchTheme}
                theme={theme}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/posts/:postId"
          element={
            accessToken ? (
              <PostPage
                onLogout={handleLogout}
                onSwitch={switchTheme}
                theme={theme}
                setLoading={setLoading}
                setOpen={setOpen}
                setSeverity={setSeverity}
                setSnackbarMessage={setSnackbarMessage}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/profile/latch-list"
          element={
            accessToken ? (
              <LatchList
                onLogout={handleLogout}
                onSwitch={switchTheme}
                theme={theme}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/register"
          element={
            accessToken ? (
              <Navigate to="/feed" />
            ) : (
              <Register handleSubmit={handleRegister} />
            )
          }
        />

        <Route
          path="/feed"
          element={
            accessToken ? (
              <FeedPage
                onLogout={handleLogout}
                onSwitch={switchTheme}
                theme={theme}
                setLoading={setLoading}
                setSnackbarMessage={setSnackbarMessage}
                setSeverity={setSeverity}
                setOpen={setOpen}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/profile/:username"
          element={
            accessToken ? (
              <ProfilePage
                onLogout={handleLogout}
                onSwitch={switchTheme}
                posts={posts}
                theme={theme}
                setLoading={setLoading}
              />
            ) : (
              <Navigate to="/login" />
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
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default App;
