import Grid from "@mui/material/Grid";
import React from "react";
import NavBar from "../components/NavBar";
import PostSide from "../components/PostSide";
import ProfileSide from "../components/ProfileSide";
import TrendSide from "../components/TrendSide";
import "../style/Feed.css";

const FeedPage = ({ onLogout, onSwitch, theme, currentUser, setLoading }) => {
  return (
    <div data-theme={theme} className="parent">
      <NavBar onLogout={onLogout} onSwitch={onSwitch} theme={theme} />
      <Grid container sx={{ minHeight: "100vh" }}>
        <Grid item xs={12} md={3}>
          <ProfileSide theme={theme} user={currentUser} />
        </Grid>
        <Grid item xs={12} md={6}>
          <PostSide setLoading={setLoading} />
        </Grid>
        <Grid item xs={12} md={3}>
          <TrendSide />
        </Grid>
      </Grid>
    </div>
  );
};

export default FeedPage;
