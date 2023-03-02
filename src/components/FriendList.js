
import { Avatar, Button, Divider, Grid, Paper } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import alt from "../images/alternate.jpg";

import { useNavigate } from 'react-router-dom';
import * as userService from "../services/user";

import EditIcon from "@mui/icons-material/Edit";


const FriendList = ({ theme }) => {


  const [users, setUsers] = useState(null);

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = useState("");

  //get follow list
  async function getFollowingList() {
    await userService.getCurrentUser().then( async (response) => {
      setCurrentUser(response.data);
      console.log(response.data);
      await userService.getFollowList(response.data.username).then((response) => {
        setUsers(response.data);
        console.log(response.data);
      });
    });

  }

  const navigate = useNavigate();

  const GoToProfile = async (user) => {
    console.log(user);
    const username = user.username;
    navigate(`/profile/visit/${username}`);
  };

  useEffect(() => {
    getFollowingList();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }


  return (
    <div data-theme={theme}>
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
              className="profile-imgg"
              sx={{ width: "200px", height: "200px", marginTop: "-75px" }}
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
                    fontSize: "20px",
                    fontFamily: "montserrat",
                    fontWeight: "700",
                  }}
                >
                 {currentUser === null ? 0 : currentUser.postsCount}
                </h3>
                <h1 style={{ fontSize: "15px", fontFamily: "montserrat", fontWeight:"lighter", fontWeight: 500  }}>
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
                    fontWeight: "700",
                  }}
                >
                  {currentUser === null ? 0 : currentUser.followersCount}
                </h3>
                <h1 style={{ fontSize: "15px", fontFamily: "montserrat", fontWeight:"lighter", fontWeight: 500  }}>
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
                    fontWeight: "700",
                  }}
                >
                  {currentUser === null ? 0 : currentUser.followingCount}
                </h3>
                <h1 style={{ fontSize: "15px", fontFamily: "montserrat", fontWeight:"lighter", fontWeight: 500 }}>
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
            <div className="name-info" >
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
                <h1 style={{ fontSize: "20px"}}>
                  {currentUser === null
                    ? ""
                    : `${currentUser.firstname} ${currentUser.lastname}`}
                </h1>
                <h3 style={{ fontSize: "15px"}}>
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
              </Paper>
            </Grid>

            <Grid
              className="left"
              item
              xs={12}
              md={8.5}
              sx={{
                display: "flex",
                flexDirection: "column",
                marginTop: "3px",
              }}
            >
              <Paper className='list2' sx={{ height: "auto", display: "flex", flexDirection:"column"  }}>
          <Box className="title" sx={{ margin:"10px", display: "flex", flexDirection: "column", width: "90%", borderRadius:"0.3rem"}}>
            <span style={{ fontWeight: "600" }}><Divider className='dividerTitle'>Latch List</Divider></span>
          </Box>
            <Box className="latchBoxx" sx={{ marginBottom:"15px", display: "flex", flexDirection: "column", width: "95%", borderRadius:"0.3rem", height: "auto" }}>
            {users && users.map((user) => (
                <Box className="nameList" sx={{ display:"flex", width:"100%", marginTop: "5px"  }} onClick={() => {GoToProfile(user)}}>
                  <Box className="latchInfoBox" sx={{ display:"flex", width:"100%", height:"100px" }}>
                      <Box classname="latchImg" sx={{ display:"flex", width:"25%", height:"100px",  alignItems:"center", justifyContent:"center" }}>
                          <Avatar src={user.imageUrl}style={{ width:"4.5rem", borderRadius:"10%", height:"70%" }}/>
                      </Box>
                      <Box classname="latchInfos" sx={{ display:"flex", width:"60%", height:"100px", lineHeight:"0px",  flexDirection:"column" , justifyContent:"center"}}>
                          <h1 style={{ fontSize:"15px", fontWeight:"700", color: (() => theme === "dark" ? "white" : "black") }}>{`${user.firstname} ${user.lastname}`}</h1>
                          <h3 style={{ fontSize:"12px", fontWeight:"300", color: (() => theme === "dark" ? "#9b9b9b" : "#424242") }}>@{`${user.username}`}</h3>
                      </Box>
                </Box>
            </Box>
            ))}
            </Box>
        </Paper>

            </Grid>
          </Grid>
        </Paper>
      </div>
    </div>
  )
}

export default FriendList