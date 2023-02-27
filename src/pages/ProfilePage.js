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

const ProfilePage = ({ posts, theme, onSwitch }) => {
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
    <div data-theme={theme} className="parent">
      <NavBar onSwitch={onSwitch} theme={theme} />
      <Grid container sx={{ minHeight: "100vh" }}>
        <Paper sx={{ width: "100%" }} className="main">
          <Grid
            item
            className="header"
            sx={{
              width: "100%",
              height: "300px",
              backgroundAttachment: "fixed",
              paddingBottom: "15px",
            }}
          />
          <Grid
            item
            className="profileDp"
            sx={{
              width: "100%",
              display: "flex",
              paddingLeft: "150px",
              boxShadow: "2"
            }}
          >
            <Avatar
              alt="Sana Minatozaki"
              src={sana}
              sx={{ width: "20rem", height: "20rem", boxShadow: "2", marginTop: "-150px", marginBottom:"20px" }}
            />
            <Grid
              container
              item
              xs={12}
              className="following-holder"
              sx={{ marginTop: "50px", paddingLeft: "200px" }}
            >
              <Box
                className="names"
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
                sx={{ paddingLeft: "200px" }}
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
                sx={{ paddingLeft: "200px" }}
              >
                <Box className="title-head">
                  <span>Following</span>
                </Box>
                <Box className="sub-head">
                  <span>3</span>
                </Box>
              </Box>
            </Grid>
          </Grid>

          <Divider variant="fullWidth" className="divider"/>

          <Grid container sx={{ minHeight: "100vh" }} className="postBG">
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
                        sx={{ cursor: "pointer", fontSize: "30px" }}
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
                            sx={{
                              cursor: "pointer",
                              justifyContent: "right",
                            }}
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
                        {like ? <span>LikeD</span> : <span>Like</span>}
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
    </div>
  );
};

export default ProfilePage;
