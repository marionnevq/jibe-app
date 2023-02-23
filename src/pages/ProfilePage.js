import React, { useState, useEffect } from "react";
import sana from "../images/sana.jpg";
import { Grid, Avatar } from "@mui/material";
import "../style/Profile.css";
import NavBar from "../components/NavBar";
import ProfilePostPage from "../components/ProfilePostPage";

const ProfilePage = ({ posts }) => {
  // const [posts, setPosts] = useState([])
  // const [followers, setFollowers] = useState([]);
  // const [following, setFollowing] = useState([]);

  // const getPosts = async () => {
  //   const response = await fetch("../data/posts.js")
  //   const data = await response.json();
  //   setPosts(data);
  // }
  // const getFollowers = async () => {
  //   const response = await fetch("https://jsonplaceholder.typicode.com/users");
  //   const data = await response.json();
  //   setFollowers(data);
  // };
  // const getFollowing = async () => {
  //   const response = await fetch("https://jsonplaceholder.typicode.com/users");
  //   const data = await response.json();
  //   setFollowing(data);
  // };

  // useEffect(() => {
  //   getPosts()
  //   getFollowers();
  //   getFollowing();
  // }, []);

  console.log("This is POST_DATA from ProfilePage.js", posts);
  return (
    <>
      <NavBar />
      <Grid
        container
        style={{ minHeight: "100vh" }}
        spacing={3}
        className="main-container"
      >
        <Grid item xs={5}>
          <div className="profile-pic">
            <Avatar src={sana} sx={{ width: 250, height: 250 }} />
          </div>
        </Grid>
        <Grid item xs >
          <div className="profile-name">Nikki Fagara</div>
          <div className="profile-tag">@NikkiFagara</div>
          <div className="profile-bio">
            <em>"I am the greatest..."</em>
          </div>
          <Grid container spacing={2} columns={15} className="sub-container">
            <Grid item xs={2.7} className="left">
              <div className="left-title">Posts</div>
              <div className="left-sub">12345</div>
            </Grid>
            <Grid item xs={4} className="middle">
              <div className="middle-title">Followers</div>
              <div className="middle-sub">5.6m</div>
            </Grid>
            <Grid item xs={2} className="right">
              <div className="right-title">Following</div>
              <div className="right-sub">3</div>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={2} columns={16} className="posts-container">
          {posts.map((post) => (
            <ProfilePostPage key={posts.id} post={post} />
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default ProfilePage;
