import { Button, Divider, Grid, IconButton, Paper } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router";

const LatchSuggestion = ({ user }) => {
  const navigate = useNavigate();

  const GoToProfile = async (user) => {
    console.log(user);
    const username = user.username;
    navigate(`/profile/visit/${username}`);
  };

  return (
    <Box
      className="latchInfo"
      sx={{ width: "100%", height: "auto", display: "flex", marginTop: "10px", borderBottom: "1px solid gray", paddingBottom: "10px"  }}
    >
      <Box
        className="latchDp"
        sx={{
          width: "20%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: "15px"
        }}
      >
        <img src={user.imageUrl} />
      </Box>
      <Box
        className="latchName"
        sx={{ width: "100%", cursor: "pointer", marginLeft: "15px" }}
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

      <Divider className="divider-feed" />
    </Box>
  );
};

export default LatchSuggestion;
