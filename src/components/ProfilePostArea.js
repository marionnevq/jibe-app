import {
  Avatar,
  Button,
  Divider,
  IconButton,
  Paper,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import unlike from "../images/unlike.png";
import liked from "../images/liked.png";
import { Box } from "@mui/system";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { getUserPosts } from "../services/post";
import { getUser } from "../services/auth";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import alt from "../images/alternate.jpg";
import { useNavigate } from "react-router-dom";
import ModeCommentIcon from "@mui/icons-material/ModeComment";

const ProfilePostArea = ({ theme }) => {
  const [like, setLike] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [currentUser, setCurrentUser] = useState("");
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const convertTime = (postDate) => {
    TimeAgo.addLocale(en);
    const timeAgo = new TimeAgo("en-US");
    const ago = timeAgo.format(new Date(postDate));
    return ago;
  };

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

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginTop: "10px",
        marginLeft: "1.3rem",
      }}
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
                <Avatar
                  className="profile-img"
                  src={currentUser === null ? alt : currentUser.imageUrl}
                ></Avatar>
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
              <IconButton className="options" onClick={handleOpenMenu}>
                <MoreHorizIcon />
              </IconButton>
              <Menu
                // id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseMenu}
                className="menu"
              >
                <MenuItem
                  className="menuItem"
                  sx={{ fontFamily: "montserrat" }}
                >
                  <EditRoundedIcon />
                  &nbsp;&nbsp;Edit
                </MenuItem>
                <MenuItem
                  className="menuItem"
                  sx={{ fontFamily: "montserrat" }}
                >
                  <DeleteRoundedIcon />
                  &nbsp; Move to trash
                </MenuItem>
              </Menu>
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
              {post && post.imageUrl === null ? (
                <Divider className="divider" />
              ) : (
                <Box
                  className="imgContent"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: "95%",
                    marginLeft: "30px",
                    border: "1px solid lightgrey",
                    borderRadius: "0.6rem",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                  }}
                >
                  <img
                    src={`${post.imageUrl}`}
                    style={{ width: "80%", height: "80%" }}
                  />
                </Box>
              )}
            </div>
          </Box>
          {/* <Divider /> */}
          <Box
            className="txtContent"
            sx={{
              p: 0.2,
              color: () => (theme === "light" ? "#333333" : "white"),
            }}
          >
            <span>
              {post.numLikes === 0 ? "" : <img src={liked} alt="" />}
              {post.numLikes === 0 ? "" : `${post.numLikes}`}
            </span>
            <span>
              {post.numComments === 0 ? (
                ""
              ) : (
                <ModeCommentIcon
                  sx={{ color: "#ff5d75", width: "15px", height: "15px" }}
                />
              )}
              {post.numComments === 0 ? "" : `${post.numComments}`}
            </span>
          </Box>
          <Box
            className="reactions"
            sx={{
              p: 0.2,
              color: () => (theme === "light" ? "#333333" : "white"),
            }}
          >
            <Box className="like" sx={{ p: 0.2 }}>
              <div
                className="likebtn"
                onClick={handleChangeIcon}
                sx={{ color: () => (theme === "light" ? "#333333" : "white") }}
              >
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
              <Button
                className="commentButton"
                onClick={() => {
                  navigate(`/posts/${post.postID}`);
                }}
              >
                <ModeCommentOutlinedIcon />
                <span>Comment</span>
              </Button>
            </Box>
          </Box>
          {/* <Divider sx={{ marginBottom: "10px" }} /> */}
        </Paper>
      ))}
    </div>
  );
};

export default ProfilePostArea;
