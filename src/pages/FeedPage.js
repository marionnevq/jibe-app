import Grid from "@mui/material/Grid";
import React from "react";
import NavBar from "../components/NavBar";
import "../style/Feed.css";
import { useNavigate } from "react-router-dom";
import ProfileSide from "../components/ProfileSide";
import PostSide from "../components/PostSide";
import TrendSide from "../components/TrendSide";

const FeedPage = ({ onLogout, onSwitch, theme, currentUser, setLoading }) => {
  return (
    <div data-theme={theme} className="parent">
      <NavBar onLogout={onLogout} onSwitch={onSwitch} theme={theme} />
      <Grid container sx={{ minHeight: "100vh"}}>
        <Grid item xs={12} md={3} sx={{position: "sticky", position: "-webkit-sticky" }}>
          <ProfileSide theme={theme} user={currentUser} />
        </Grid>
        <Grid item xs={12} md={6} sx={{overflow: "auto"}}>
          <PostSide theme={theme} setLoading={setLoading} />
        </Grid>
        <Grid item xs={12} md={3} sx={{position: "sticky"}}>
          <TrendSide theme={theme}/>
        </Grid>
      </Grid>
    </div>
  );
};

export default FeedPage;
