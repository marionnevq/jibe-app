
import { Avatar } from "@mui/material";

import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router";
import alt from "../images/alternate.jpg"
import "../style/Feed.css"

const LatchSuggestion = ({ user, theme }) => {
  const navigate = useNavigate();

  const GoToProfile = async (user) => {
    console.log(user);
    const username = user.username;
    navigate(`/profile/visit/${username}`);
  };

  return (
    <Box
      className="latchInfo"
      sx={{ width: "100%", height: "100%", display: "flex", borderRadius: "10px", marginBottom: "5px" }}
      // className="latch-info"
      // data-theme={theme}
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
        <Avatar className="prof-dp" src={user? user.imageUrl : alt} />
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
    </Box>
  );
};

export default LatchSuggestion;
