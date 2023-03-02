import LatchSuggestion from "./LatchSuggestion";

import {
  Avatar,
  Button,
  Divider,
  Grid,
  IconButton,
  Paper,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getCurrentUser } from "../services/user";
import dp from "../images/nik.jpg";
import alternate from "../images/alternate.jpg";
import * as userService from "../services/user";
import alt from "../images/alternate.jpg";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const ProfileSide = ({ theme }) => {
  const [users, setUsers] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const current = await getCurrentUser();
    setCurrentUser(current.data);
  };

  //get more people
  async function getUsers() {
    const currUser = await userService.getCurrentUser();
    setCurrentUser(currUser.data);
    const users = await userService.getRandomUsers(4, currUser.data.id);
    console.log(users);
    setUsers(users.data);
  }
  useEffect(() => {
    getUsers();
  }, []);

  const GoToProfile = async (user) => {
    console.log(user);
    const username = user.username;
    navigate(`/profile/visit/${username}/temp`);
  };

  return (
    <div
      className="profileSide"
      style={{ minWidth: "100%", marginTop: "10px" }}
      data-theme={theme}
    >
      <Grid
        container
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper
            className="profile"
            sx={{
              width: "90%",
              minHeight: "270px",
              borderRadius: "0.6rem",
              boxShadow: "1",
            }}
          >
            <Grid
              item
              className="header"
              sx={{
                width: "100%",
                height: "90px",
                backgroundSize: "26%",
                backgroundAttachment: "fixed",
                paddingBottom: "15px",
                borderRadius: "0.6rem",
              }}
            />
            <Grid
              item
              className="profileDp"
              sx={{
                width: "100%",
                marginTop: "-50px",
                justifyContent: "center",
                display: "flex",
              }}
            >
              <Avatar
                className="profile-feed"
                src={currentUser === null ? alt : currentUser.imageUrl}
                sx={{ width: "150px", height: "150px" }}
                onClick={() => {
                  navigate(`/profile/${currentUser.username}`);
                }}
              ></Avatar>
              {/* <img src={currentUser === null ? " " : `${currentUser.imageUrl}`} alt="" onClick={() => (GoToProfile(currentUser))}/> */}
            </Grid>
            <Box className="names" sx={{ marginTop: "10px" }}>
              <Box className="name">
                <span onClick={GoToProfile}>
                  {currentUser === null
                    ? " "
                    : `${currentUser.firstname} ${currentUser.lastname}`}
                </span>
              </Box>
              <Box className="username">
                <span>
                  @{currentUser === null ? " " : `${currentUser.username}`}
                </span>
              </Box>
            </Box>
            <Divider className="divider" />
            <Grid item className="followerPart">
              <Box className="followers" sx={{ width: "100%", p: 0.5 }}>
                <span>
                  {currentUser === null ? 0 : currentUser.followersCount}
                </span>
                <span>Followers</span>
              </Box>
              <Divider
                className="divider"
                orientation="vertical"
                variant="middle"
                flexItem
              />
              <Box className="following" sx={{ width: "100%", p: 0.5 }}>
                <span>
                  {currentUser === null ? 0 : currentUser.followingCount}
                </span>
                <span>Following</span>
              </Box>
            </Grid>
          </Paper>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          <Grid
            container
            item
            className="latchBox"
            sx={{ width: "90%", height: "230px" }}
          >
            <Box
              className="latchTitle"
              sx={{
                width: "100%",
                height: "40px",
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
              }}
            >
              <h1 id="text" >Find more people</h1>
            </Box>
            <Box
              className="latchList"
              sx={{
                width: "100%",
                height: "auto",
                flexDirection: "column",
                p: 0.5,
                borderRadius: "0.6rem",
                paddingBottom: "20px",
                paddingTop: "5px"
              }}
            >
              {users && users.map((user) => <LatchSuggestion user={user} />)}
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProfileSide;
