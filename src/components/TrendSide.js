import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Box, Divider, Grid, IconButton, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import * as userService from "../services/user";

const TrendSide = () => {
  const [users, setUsers] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const navigate = useNavigate();

  const GoToProfile = async (user) => {
    console.log(user);
    const username = user.username;
    navigate(`/profile/visit/${username}`);
  };

  //get more people
  async function getUsers() {
    const currUser = await userService.getCurrentUser();
    setCurrentUser(currUser.data);
    const users = await userService.getRandomUsers(5, currUser.data.id);
    setUsers(users.data);
  }
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="trendSide" style={{ minWidth: "100%", marginTop: "10px" }}>
      <Grid
        container
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Paper
          className="trends"
          sx={{
            width: "90%",
            height: "330px",
            paddingBottom: "10px",
            borderRadius: "0.6rem",
            boxShadow: "2",
          }}
        >
          <Grid
            item
            className="trendGrid"
            xs={12}
            sx={{
              p: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span>Find more people</span>
          </Grid>
          <Divider className="divider" />
          <Grid
            container
            item
            className="latchBox"
            sx={{ width: "90%", height: "230px" }}
          >
            <Box
              className="latchList"
              sx={{
                width: "100%",
                height: "200px",
                p: 0.5,
                borderRadius: "0.6rem",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {users &&
                users.map((user) => (
                  <Box
                    className="latchInfo"
                    sx={{
                      width: "100%",
                      height: "47px",
                      display: "flex",
                      marginTop: "5px",
                      marginBottom: "5px",
                    }}
                  >
                    <Box
                      className="latchDp"
                      sx={{
                        width: "20%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img src={user.imageUrl} />
                    </Box>
                    <Box
                      className="latchName"
                      sx={{ width: "75%", cursor: "pointer" }}
                      onClick={() => {
                        GoToProfile(user);
                      }}
                    >
                      <span>{`${user.firstname} ${user.lastname}`}</span>
                      <span>@{user.username}</span>
                    </Box>
                    <Box className="latchBtn" sx={{ width: "5%" }}>
                      <IconButton className="buttonLatch">
                        <PersonAddIcon />
                      </IconButton>
                    </Box>
                    <Divider className="divider" />
                  </Box>
                ))}
            </Box>
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
};

export default TrendSide;
