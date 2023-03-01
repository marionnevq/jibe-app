import { Button, Divider, Grid, IconButton, Paper } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router";

const LatchSuggestion = ({ user }) => {
  const navigate = useNavigate();

  const GoToProfile = async (user) => {
    console.log(user);
    const username = user.username;
    navigate(`/profile/visit/${username}/temp`);
  };

  return (
    <Box
      className="latchInfo"
      sx={{ width: "100%", height: "100%", display: "flex" }}
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
        sx={{ width: "60%", cursor: "pointer" }}
        onClick={() => {
          GoToProfile(user);
        }}
      >
        <span>{`${user.firstname} ${user.lastname}`}</span>
        <span>@{user.username}</span>
      </Box>

      {/* <Box className="latchBtn" sx={{ width: "20%" }}>
        <IconButton className="buttonLatch">
          <PersonAddIcon sx={{ color: "#EB4660" }} />
        </IconButton>
      </Box> */}

      <Divider className="divider" />
    </Box>
  );
};

export default LatchSuggestion;
