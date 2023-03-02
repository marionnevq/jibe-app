import EditIcon from "@mui/icons-material/Edit";
import { Avatar, Button, Divider, Grid, Modal, Paper } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import EditUser from "../components/EditUser";
import NavBar from "../components/NavBar";
import ProfilePostArea from "../components/ProfilePostArea";
import alt from "../images/alternate.jpg";
import { getUser } from "../services/auth";
import "../style/Profile.css";

import PostForm from "../components/PostForm";

const ProfilePage = ({ onLogout, onSwitch, theme, setLoading }) => {
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const [open, setOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const current = await getUser();
    setCurrentUser(current.data);
    console.log(current.data);
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage({
        image: URL.createObjectURL(img),
      });
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div data-theme={theme}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
        sx={{ overflow: "scroll" }}
      >
        <EditUser handleClose={handleClose} />
      </Modal>
      <NavBar onLogout={onLogout} onSwitch={onSwitch} theme={theme} />
      <div style={{ minHeight: "100vh" }}>
        <Box className="cover" id="header" />

        <Grid container className="main-header">
          <Grid
            className="top-head"
            id="info-head"
            container
            item
            xs={12}
            md={3.5}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar
              className="profile-img"
              src={currentUser === null ? alt : currentUser.imageUrl}
            ></Avatar>
          </Grid>

          <Grid
            className="bottom-head"
            id="info-head"
            container
            item
            xs={12}
            md={8.5}
            sx={{ height: "auto" }}
          >
            <div className="web">
              <Grid
                id="details"
                item
                xs={12}
                md={2.5}
                sx={{
                  display: "block",
                  textAlign: "center",
                  lineHeight: "10px",
                }}
              >
                <h3
                  style={{
                    fontSize: "35px",
                    fontFamily: "montserrat",
                    fontWeight: "500",
                  }}
                >
                  {currentUser === null ? 0 : currentUser.postsCount}
                </h3>
                <h1
                  style={{
                    fontSize: "20px",
                    fontFamily: "poppins",
                    fontWeight: "lighter",
                  }}
                >
                  Posts
                </h1>
              </Grid>
              <Grid
                id="details"
                item
                xs={12}
                md={2.5}
                sx={{
                  display: "block",
                  textAlign: "center",
                  lineHeight: "10px",
                }}
              >
                <h3
                  style={{
                    fontSize: "35px",
                    fontFamily: "montserrat",
                    fontWeight: "500",
                  }}
                >
                  {currentUser === null ? 0 : currentUser.followersCount}
                </h3>
                <h1
                  style={{
                    fontSize: "20px",
                    fontFamily: "poppins",
                    fontWeight: "lighter",
                  }}
                >
                  Followers
                </h1>
              </Grid>
              <Grid
                id="details"
                item
                xs={12}
                md={2.5}
                sx={{
                  display: "block",
                  textAlign: "center",
                  lineHeight: "10px",
                }}
              >
                <h3
                  style={{
                    fontSize: "35px",
                    fontFamily: "montserrat",
                    fontWeight: "500",
                  }}
                >
                  {currentUser === null ? 0 : currentUser.followingCount}
                </h3>
                <h1
                  style={{
                    fontSize: "20px",
                    fontFamily: "poppins",
                    fontWeight: "lighter",
                  }}
                >
                  Following
                </h1>
              </Grid>
              <Grid
                id="button-follow"
                item
                xs={12}
                md={3}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="outlined"
                  className="latch-btn1"
                  onClick={handleOpen}
                >
                  <EditIcon sx={{ marginRight: "10px" }} /> Edit
                </Button>
              </Grid>
            </div>
          </Grid>

          <div className="mobile" style={{ display: "block" }}>
            <div className="name-info">
              <h1 className="name-details">
                {currentUser === null
                  ? ""
                  : `${currentUser.firstname} ${currentUser.lastname}`}
              </h1>
              <h3>@{currentUser === null ? "" : `${currentUser.username}`}</h3>
            </div>
            <Grid
              container
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "auto",
                marginTop: "30px",
              }}
            >
              <div className="mobile-items">
                <h3 style={{ fontSize: "21px", fontFamily: "montserrat" }}>
                  {currentUser === null ? 0 : currentUser.postsCount}
                </h3>
                <h1 style={{ fontSize: "18px", fontFamily: "montserrat" }}>
                  Posts
                </h1>
              </div>
              <div className="mobile-items">
                <h3 style={{ fontSize: "21px", fontFamily: "montserrat" }}>
                  {currentUser === null ? 0 : currentUser.followersCount}
                </h3>
                <h1 style={{ fontSize: "18px", fontFamily: "montserrat" }}>
                  Followers
                </h1>
              </div>
              <div className="mobile-items">
                <h3 style={{ fontSize: "21px", fontFamily: "montserrat" }}>
                  {currentUser === null ? 0 : currentUser.followingCount}
                </h3>
                <h1 style={{ fontSize: "18px", fontFamily: "montserrat" }}>
                  Following
                </h1>
              </div>
            </Grid>
          </div>

          <Divider className="divider-mobile" />
          <div className="button">
            <Grid container item>
              <Grid
                item
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Button className="btn-latch" variant="outlined">
                  <EditIcon sx={{ marginRight: "10px" }} /> Edit Profile
                </Button>
              </Grid>
            </Grid>
          </div>
          {/* ADD HERE */}
          <div className="button">
            <Grid container item>
              <Grid
                item
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <PostForm
                  currentUser={currentUser}
                  setLoading={setLoading}
                  theme={theme}
                />
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Paper className="bottom-foot">
          <Grid container className="foot" style={{ height: "auto" }}>
            <Grid
              className="left"
              item
              xs={12}
              md={3.5}
              sx={{
                display: "flex",
                flexDirection: "column",
                marginTop: "10px",
              }}
            >
              <Paper
                className="window-name"
                style={{
                  width: "95%",
                  borderRadius: "0.6rem",
                  boxShadow: "none",
                  height: "auto",
                  paddingRight: "10px",
                  paddingLeft: "10px",
                  wordBreak: "break-word",
                }}
              >
                <h1 style={{ fontSize: "40px" }}>
                  {currentUser === null
                    ? ""
                    : `${currentUser.firstname} ${currentUser.lastname}`}
                </h1>
                <h3 style={{ fontSize: "30px" }}>
                  @{currentUser === null ? "" : `${currentUser.username}`}
                </h3>
                <Divider className="divider-info" />
                <h4>
                  <em>
                    {`${currentUser.bio}` === ""
                      ? "No Bio"
                      : `${currentUser.bio}`}
                  </em>
                </h4>
              </Paper>
              {/* ADD HERE */}
              <Paper
                className="window-name"
                style={{
                  marginTop: "10px",
                  width: "95%",
                  borderRadius: "0.6rem",
                  boxShadow: "none",
                  height: "auto",
                  paddingRight: "10px",
                  paddingLeft: "10px",
                  wordBreak: "break-word",
                }}
              >
                <PostForm
                  currentUser={currentUser}
                  setLoading={setLoading}
                  theme={theme}
                />
              </Paper>
            </Grid>

            <Grid
              className="post-corner"
              item
              xs={12}
              md={8.5}
              sx={{ height: "auto" }}
            >
              <ProfilePostArea theme={theme} />
            </Grid>
          </Grid>
        </Paper>
      </div>
    </div>
  );
};

export default ProfilePage;
