import React, { useState, useRef } from "react";
import sana from "../images/sana.jpg";
import { Grid, Avatar, Paper, Divider, Button, TextField } from "@mui/material";
import "../style/Profile.css";
import NavBar from "../components/NavBar";
import { Box } from "@mui/system";
import ProfilePostPage from "../components/ProfilePostPage";
import { MoreVert } from "@mui/icons-material";
import PhotoIcon from "@mui/icons-material/Photo";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import unlike from "../images/unlike.png";
import liked from "../images/liked.png";
import test from "../images/test.jpg";

const ProfilePage = ({ posts }) => {
  console.log("This is POST_DATA from ProfilePage.js", posts);
  const [like, setLike] = useState(false);
  const [image, setImage] = useState(null);
  const imageRef = useRef();

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage({
        image: URL.createObjectURL(img),
      });
    }
  };

  const handleChangeIcon = () => {
    if (like === false) {
      setLike(true);
    } else {
      setLike(false);
    }
  };
  return (
    <>
      <NavBar />
      {/* <Grid
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
      </Grid> */}
      <Grid container sx={{ minHeight: "100vh" }}>
        <Paper sx={{ width: "100%" }}>
          <Grid
            item
            className="header"
            sx={{
              width: "100%",
              height: "300px",
              backgroundColor: "#FFE5D9",
              backgroundAttachment: "fixed",
              paddingBottom: "15px",
            }}
          />
          <Grid
            item
            className="profileDp"
            sx={{
              width: "100%",
              marginTop: "-150px",
              display: "flex",
              paddingLeft: "150px",
            }}
          >
            <Avatar
              alt="Sana Minatozaki"
              src={sana}
              sx={{ width: 300, height: 300, boxShadow: "2" }}
            />
            <Box
              className="names"
              sx={{ marginTop: "200px", paddingLeft: "200px" }}
            >
              <Box className="title-head">
                <span>Posts</span>
              </Box>
              <Box className="sub-head">
                <span>1.2k</span>
              </Box>
            </Box>
            <Box
              className="names"
              sx={{ marginTop: "200px", paddingLeft: "200px" }}
            >
              <Box className="title-head">
                <span>Followers</span>
              </Box>
              <Box className="sub-head">
                <span>10.8m</span>
              </Box>
            </Box>
            <Box
              className="names"
              sx={{ marginTop: "200px", paddingLeft: "200px" }}
            >
              <Box className="title-head">
                <span>Following</span>
              </Box>
              <Box className="sub-head">
                <span>3</span>
              </Box>
            </Box>
          </Grid>
          <Divider variant="fullWidth" sx={{ paddingTop: "50px" }} />
          <Grid container sx={{ minHeight: "100vh" }}>
            <Grid item xs={12} md={4} sx={{ marginTop: "30px" }}>
              <Box className="user-details">
                <Box className="name-head">
                  <span>Nikki Fagara</span>
                </Box>
                <Box className="username-head">
                  <span>@nikkifagara</span>
                </Box>
                <Box className="bio-head">
                  <span>
                    <em>"I am the greatest.."</em>
                  </span>
                </Box>
              </Box>
              <Grid
                container
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  alignItems: "center",
                }}
              >
                <Paper
                  className="post"
                  sx={{
                    width: "95%",
                    minHeight: "120px",
                    maxHeight: "680px",
                    paddingBottom: "2px",
                    marginTop: "150px",
                    borderRadius: "0.6rem",
                    boxShadow: "3",
                  }}
                >
                  <Box className="postInfo">
                    <Box className="postText" sx={{ p: 1 }}>
                      <TextField
                        className="shareText"
                        placeholder="What's jibin'?"
                        sx={{ width: "100%" }}
                        InputProps={{ sx: { height: "auto" } }}
                        multiline
                      />
                    </Box>
                    <Box className="postPhoto" sx={{ p: 0.5 }}>
                      <PhotoIcon
                        onClick={() => imageRef.current.click()}
                        sx={{ cursor: "pointer", fontSize: "30px"}}
                      />
                    </Box>
                  </Box>
                  <div style={{ display: "none" }}>
                    <input
                      type="file"
                      name="myImage"
                      ref={imageRef}
                      onChange={onImageChange}
                    />
                  </div>
                  {image && (
                    <Box
                      className="previewBox"
                      sx={{
                        p: 0.5,
                        border: "1px solid #d3d3d3",
                        borderRadius: "7px",
                      }}
                    >
                      <div className="previewImage">
                        <Box className="previewClose" sx={{ p: 0.5 }}>
                          <CancelRoundedIcon
                            onClick={() => setImage(null)}
                            sx={{ cursor: "pointer", justifyContent: "right" }}
                          />
                        </Box>
                        <img src={image.image} />
                      </div>
                    </Box>
                  )}
                  <Divider />
                  <Box
                    className="sharebtn"
                    justifyItems={"center"}
                    sx={{ p: 0.5 }}
                  >
                    <Button
                      className="shareButton"
                      variant="text"
                      style={{
                        backgroundColor: "transparent",
                        color: "#EB4660",
                        fontFamily: "Montserrat",
                        height: "30px",
                        fontSize: "16px",
                      }}
                    >
                      Post
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            </Grid>

            <Grid
              item
              xs={12}
              md={8}
              sx={{ paddingTop: "50px", paddingLeft: "50px" }}
            >
              {" "}
              <Paper
                className="post"
                sx={{
                  width: "95%",
                  height: "auto",
                  paddingBottom: "2px",
                  borderRadius: "0.6rem",
                  boxShadow: "3",
                }}
              >
                <Box className="info" sx={{ p: 3 }}>
                  <Box className="opImg" sx={{ p: 1 }}>
                    <div className="opInfo">
                      <Avatar
                        alt="Sana Minatozaki"
                        src={sana}
                        sx={{ width: 56, height: 56 }}
                      />
                    </div>
                  </Box>
                  <Box className="opName" sx={{ p: 2 }}>
                    <span>Nikki Fagara</span>
                    <span>a few minutes ago</span>
                  </Box>
                  <Box className="options" sx={{ p: 3 }}>
                    <MoreVert />
                  </Box>
                </Box>
                <Box className="postContent" sx={{ p: 3 }}>
                  <div className="postContent2">
                    <Box className="caption-content" sx={{ p: 2 }}>
                      <span>#NewHeader</span>
                    </Box>
                    <Box
                      className="imgContent"
                      sx={{
                        p: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img src={test} style={{ width: "70%" }} />
                    </Box>
                  </div>
                </Box>
                <Divider />
                <Box className="reactions" sx={{ p: 0.2 }}>
                  <Box className="like" sx={{ p: 0.2 }}>
                    <div className="likebtn" onClick={handleChangeIcon}>
                      <Button className="likeButton">
                        {like ? <img src={liked} /> : <img src={unlike} />}
                        {like ? <span>Like</span> : <span>Liked</span>}
                      </Button>
                    </div>
                  </Box>
                  <Box className="comment" sx={{ p: 0.2 }}>
                    <Button className="commentButton">
                      <ModeCommentOutlinedIcon />
                      <span>Comment</span>
                    </Button>
                  </Box>
                </Box>
                <Divider sx={{ marginBottom: "10px" }} />
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
};

export default ProfilePage;
