import { Button } from "@mui/material";
import React, { useState } from "react";
import * as followService from "../services/follow";
import "../style/swiper.css";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../style/swiper.css";

const FollowSlide = ({ user, currentUser }) => {
  const [isFollowed, setIsFollowed] = useState(false);

  const handleFollow = async (followerID, followeeUsername) => {
    const response = await followService.followUser(
      followerID,
      followeeUsername
    );
    setIsFollowed(true);
  };
  
  return (
    <div>
      <img id="image" src={user.imageUrl} />
      <div className="name">{user.firstname}</div>
      <div className="username">{user.username}</div>
      <div>
        <Button
          className="button"
          variant="contained"
          disabled={isFollowed}
          onClick={() => {
            handleFollow(currentUser.id, user.username);
          }}
        >
          Latch
        </Button>
      </div>
    </div>
  );
};

export default FollowSlide;
