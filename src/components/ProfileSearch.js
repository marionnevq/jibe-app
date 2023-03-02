import CloseIcon from "@mui/icons-material/Close";
import { Avatar, Box, Grid, IconButton, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { searchUsers } from "../services/auth";
import "../style/NavBar.css";

const ProfileSearch = ({ handleClose, search, theme }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    loadPost();
  }, []);

  const loadPost = async () => {
    console.log(search);
    await searchUsers(search).then((response) => {
      console.log(response.data);
      setUsers(response.data);
    });
  };

  const handleGoToProfile = (username) => {
    setLoading(true);
    const timer = setTimeout(() => {
      handleClose();
      navigate(`/profile/visit/${username}`);
      setLoading(false);
      window.location.reload(false);
    }, 3000);
  };

  if (loading) {
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 style={{ color: "#f2f2f2" }}>Loading...</h1>
      </div>
    );
  }

  console.log(users);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  return (
    <Paper
      className="search-paper"
      style={{
        ...style,
        backgroundColor: () => (theme === "light" ? "white" : "#333333"),
      }}
    >
      <Grid
        className="search-head"
        container
        sx={{
          display: "flex",
          justifyContent: "end",
          backgroundColor: () => (theme === "light" ? "white" : "#333333"),
        }}
      >
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Grid>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          backgroundColor: () => (theme === "light" ? "white" : "#333333"),
        }}
      >
        <h2 id="child-modal-title">Search Result</h2>
      </div>
      {users.map((user) => (
        <Grid
          container
          item
          sx={{
            backgroundColor: () => (theme === "light" ? "white" : "#333333"),
            borderBottom: "2px soli white",
          }}
        >
          <Box className="info" sx={{ p: 0.2 }}>
            <Box className="opImg" sx={{ p: 1 }}>
              <div className="opInfo">
                <Avatar src={user === null ? "" : user.imageUrl} alt="" />
              </div>
            </Box>
            <Box
              className="opName"
              onClick={() => handleGoToProfile(user.username)}
              sx={{
                p: 1,
                color: () => (theme === "light" ? "#333333" : "white"),
              }}
            >
              <span>
                {user === null ? "" : `${user.firstname} ${user.lastname}`}
              </span>
            </Box>
          </Box>
        </Grid>
      ))}
    </Paper>
  );
};

export default ProfileSearch;