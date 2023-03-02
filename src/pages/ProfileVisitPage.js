import BookmarkIcon from "@mui/icons-material/Bookmark";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Avatar, Button, Divider, Grid, Modal, Paper } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditUser from "../components/EditUser";
import NavBar from "../components/NavBar";
import PostVisit from "../components/PostVisit";
import alt from "../images/alternate.jpg";
import { fetchUserByUsername } from "../services/auth";
import { checkFollowing, followUser, unfollowUser } from "../services/follow";
import { getCurrentUser } from "../services/user";
import "../style/ProfileVisit.css";

const ProfileVisitPage = ({ onLogout, onSwitch, theme }) => {
  const params = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // useEffect(() => {
  //   setLoading(true);

  // }, []);

  useEffect(() => {
    setLoading(true);
    getCurrentUser().then((response) => {
      setCurrentUser(response.data);
    });
    fetchUserByUsername(params.username).then((response) => {
      setUser(response.data);
      checkFollowing(response.data.username).then((response) => {
        setIsFollowing(response.data);
      });

      setLoading(false);
    });
  }, []);

  const handleSubmit = (form) => {
    // employeeService
    //   .updateEmployee(employee.id, form)
    //   .then(() => {
    //     navigate("/");
    //   })
    //   .catch((error) => {
    //     if (error.response && error.response.status === 400) {
    //       alert(error.response.data.message[0]);
    //     }
    //   });
  };

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleLatch = () => {
    if (isFollowing) {
      unfollowUser(currentUser.id, user.username).then(() => {
        setIsFollowing(!isFollowing);
      });
    } else {
      followUser(currentUser.id, user.username).then(() => {
        setIsFollowing(!isFollowing);
      });
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div style={{ height: "auto" }}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
        sx={{ overflow: "scroll" }}
      >
        <EditUser handleClose={handleClose} theme={theme}/>
      </Modal>

      <div data-theme={theme}>
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
              {user === null ? 
                <Avatar className="profile-image" src={alt} />
               : 
                <Avatar className="profile-image" src={user.imageUrl} />
              }

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
                  className="widgetInfo"
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
                      fontSize: "20px",
                      fontFamily: "montserrat",
                      fontWeight: "500",
                    }}
                  >
                    {user === null ? 0 : user.postsCount}
                  </h3>
                  <h1 style={{ fontSize: "15px", fontFamily: "montserrat" }}>
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
                      fontSize: "20px",
                      fontFamily: "montserrat",
                      fontWeight: "500",
                    }}
                  >
                    {user === null ? 0 : user.followersCount}
                  </h3>
                  <h1 style={{ fontSize: "15px", fontFamily: "montserrat" }}>
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
                      fontSize: "20px",
                      fontFamily: "montserrat",
                      fontWeight: "500",
                    }}
                  >
                    {user === null ? 0 : user.followingCount}
                  </h3>
                  <h1 style={{ fontSize: "15px", fontFamily: "montserrat" }}>
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
                  {/* <Button
                    variant="contained"
                    className="latch-btn1"
                    onClick={handleOpen}
                  >
                    <PersonAddIcon sx={{ marginRight: "10px" }} /> Latch
                  </Button> */}
                  {isFollowing ? (
                    <Button
                      variant="outlined"
                      className="latch-btn1"
                      onClick={
                        // handleOpen
                        handleLatch
                      }
                    >
                      <BookmarkIcon sx={{ marginRight: "10px" }} /> Latched
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      className="latch-btn1"
                      onClick={
                        // handleOpen
                        handleLatch
                      }
                    >
                      <PersonAddIcon sx={{ marginRight: "10px" }} /> Latch
                    </Button>
                  )}
                </Grid>
              </div>
            </Grid>

            <div className="mobile" style={{ display: "block" }}>
              <div className="name-info">
                <h1>
                  {" "}
                  {user === null ? "" : `${user.firstname} ${user.lastname}`}
                </h1>
                <h3>@{user === null ? "" : user.username}</h3>
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
                    {user === null ? 0 : user.postsCount}
                  </h3>
                  <h1 style={{ fontSize: "18px", fontFamily: "montserrat" }}>
                    Posts
                  </h1>
                </div>
                <div className="mobile-items">
                  <h3 style={{ fontSize: "21px", fontFamily: "montserrat" }}>
                    {user === null ? 0 : user.followersCount}
                  </h3>
                  <h1 style={{ fontSize: "18px", fontFamily: "montserrat" }}>
                    Followers
                  </h1>
                </div>
                <div className="mobile-items">
                  <h3 style={{ fontSize: "21px", fontFamily: "montserrat" }}>
                    {user === null ? 0 : user.followingCount}
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
                  {/* <Button className="btn-latch" variant="contained">
                    <PersonAddIcon sx={{ marginRight: "10px" }} /> Latch
                  </Button> */}
                  {isFollowing ? (
                    <Button
                      variant="outlined"
                      className="latch-btn1"
                      onClick={
                        // handleOpen
                        handleLatch
                      }
                    >
                      <BookmarkIcon sx={{ marginRight: "10px" }} /> Latched
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      className="latch-btn1"
                      onClick={
                        // handleOpen
                        handleLatch
                      }
                    >
                      <PersonAddIcon sx={{ marginRight: "10px" }} /> Latch
                    </Button>
                  )}
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
                      justifyContent: "center",
                      alignItems: "start",
                      marginTop: "10px",
                    }}
                  >
                    <Paper
                      className="window-name"
                      style={{
                        width: "95%",
                        borderRadius: "5px",
                        boxShadow: "none",
                        height: "auto",
                        paddingRight: "10px",
                        paddingLeft: "10px",
                        wordBreak: "break-word",
                      }}
                    >
                      <h1>
                        {" "}
                        {user === null
                          ? ""
                          : `${user.firstname} ${user.lastname}`}
                      </h1>
                      <h3>@{user === null ? "" : user.username}</h3>
                      <Divider className="divider-info" />
                      <h4>{user === null ? "" : user.bio}</h4>
                    </Paper>
                  </Grid>
                  <Grid
                    className="post-corner"
                    item
                    xs={12}
                    md={8.5}
                    sx={{ height: "auto" }}
                  >
                    <PostVisit theme={theme} user={user} />
                  </Grid>
                </Grid>
              </Paper>

        </div>
      </div>
    </div>
  );
};

export default ProfileVisitPage;
