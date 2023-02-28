import {
  Avatar,
  Button,
  Divider,
  Grid,
  IconButton,
  Paper,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import bg1 from "../images/bg1.jpg";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import alt from "../images/alternate.jpg";
import unlike from "../images/unlike.png";
import liked from "../images/liked.png";
import { Box } from "@mui/system";
import TimeAgo from "javascript-time-ago";
import en from 'javascript-time-ago/locale/en'
import { getUserPosts } from "../services/post";
import { getUser } from "../services/auth";

const ProfilePostArea = ({ theme }) => {
  const [like, setLike] = useState(false);

  
  const [currentUser, setCurrentUser] = useState("");
  const [posts, setPosts] = useState([]);

  const convertTime = (postDate) => {
    TimeAgo.addLocale(en);
    const timeAgo = new TimeAgo("en-US");
    const ago = timeAgo.format(new Date(postDate));
    return ago;
  }
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const current = await getUser();
    setCurrentUser(current.data);
    await getUserPosts(current.data.username).then((userPosts) => {
      setPosts(userPosts.data);
      console.log(userPosts.data);
    });
    
  };
  const handleChangeIcon = () => {
    if (like === false) {
      setLike(true);
    } else {
      setLike(false);
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection:"column", justifyContent: "center", marginTop: "10px", marginLeft: "1.3rem"}}
    >
      {posts.map((post) => (
        
        <Paper
          className="post"
          sx={{
            width: "95%",
            height: "auto",
            paddingBottom: "2px",
            borderRadius: "0.6rem",
            boxShadow: "3",
            backgroundColor: () => (theme === "light" ? "white" : "#333333"),
          }}
        >
          <Box className="info" sx={{ p: 0.2 }}>
            <Box className="opImg" sx={{ p: 1 }}>
              <div className="opInfo">
                <img
                  src={currentUser === null ? "" : currentUser.imageUrl}
                  alt=""
                />
              </div>
            </Box>
            <Box
              className="opName"
              sx={{
                p: 1,
                color: () => (theme === "light" ? "#333333" : "white"),
              }}
            >

              <span>
                {currentUser === null
                  ? ""
                  : `${currentUser.firstname} ${currentUser.lastname}`}
              </span>
              <span>{convertTime(post.datePosted)}</span>
            </Box>
            <Box className="options" sx={{ p: 1 }}>
              <IconButton>
                <MoreHorizIcon />
              </IconButton>
            </Box>
          </Box>
          <Box
            className="postContent"
            sx={{
              p: 0.2,
              color: () => (theme === "light" ? "#333333" : "white"),
            }}
          >
            <div className="postContent2">
              <Box className="txtContent" sx={{ p: 0.2 }}>
                <span>{post.length === 0 ? "" : post.body}</span>
              </Box>
              {post.length === 0 ? null : (
                <Box
                  className="imgContent"
                  sx={{ p: 1, display: "flex", height: "auto" }}
                >
                  <img src={`${post.imageUrl}`} style={{ width: "100%" }} />
                </Box>
              )}
            </div>
          </Box>
          <Divider />
          <Box
            className="reactions"
            sx={{
              p: 0.2,
              color: () => (theme === "light" ? "#333333" : "white"),
            }}
          >
            <Box className="like" sx={{ p: 0.2 }}>
              <div className="likebtn" onClick={handleChangeIcon}>
                <Button className="likeButton">
                  {like ? <img src={liked} /> : <img src={unlike} />}
                  {like ? <span>Liked</span> : <span>Like</span>}
                </Button>
              </div>
            </Box>
            <Divider
              className="divider"
              sx={{ height: 28, m: 0.5 }}
              orientation="vertical"
            />
            <Box className="comment" sx={{ p: 0.2 }}>
              <Button className="commentButton">
                <ModeCommentOutlinedIcon />
                <span>Comment</span>
              </Button>
            </Box>
          </Box>
          <Divider sx={{ marginBottom: "10px" }} />
        </Paper>
      ))}
    </div>
  );
};

export default ProfilePostArea;
