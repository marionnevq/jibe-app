import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  Avatar,
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Paper,
} from "@mui/material";
import { Box } from "@mui/system";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import alt from "../images/alternate.jpg";
import liked from "../images/liked.png";
import unlike from "../images/unlike.png";
import { checkLiked, createLike, getLike, removeLike } from "../services/like";
import { deletePost } from "../services/post";
import { getCurrentUser } from "../services/user";
import "../style/Feed.css";
import EditPost from "./EditPost";

const PostComponent = ({ post, theme }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const opening = Boolean(anchorEl);
  const [open, setOpen] = React.useState(false);
  const opened = Boolean(open);
  const [like, setLike] = useState(false);
  const [currentUser, setCurrentUser] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(currentUser);
    loadPost();
  }, []);

  const convertTime = (postDate) => {
    TimeAgo.addLocale(en);
    const timeAgo = new TimeAgo("en-US");
    const ago = timeAgo.format(new Date(postDate));
    return ago;
  };

  const loadPost = async () => {
    await getCurrentUser().then(async (response) => {
      setCurrentUser(response.data);
      await checkLiked(post.postID, response.data.id).then((response) => {
        console.log(response.data);
        setLike(response.data);
      });
    });
  };

  const handleChangeIcon = async () => {
    await checkLiked(post.postID, currentUser.id).then(async (response) => {
      let isLiked = response.data;
      if (!isLiked) {
        await createLike(post.postID, currentUser.id).then(async (response) => {
          setLike(true);
        });
      } else {
        await getLike(post.postID, currentUser.id).then(async (response) => {
          let reactionID = response.data.reactionID;

          await removeLike(reactionID).then((response) => {
            setLike(false);
          });
        });
      }
    });
  };

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDeletePost = () => {
    deletePost(post.postID);
    window.location.reload();
  };
  /*
  <Modal
        open={opened}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
        sx={{ overflow: "scroll" }}
      >
        <EditPost handleClose={handleClose} post={post} />
      </Modal>
      */
  return (
    <Paper
      data-theme={theme}
      className="post"
      sx={{
        width: "94%",
        height: "auto",
        paddingBottom: "2px",
        borderRadius: "5px",
        boxShadow: "3",
        backgroundColor: () => (theme === "light" ? "white" : "#343434"),
        marginBottom: "10px"
      }}
    >
      <Modal
        open={opened}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
        sx={{ overflow: "scroll" }}
      >
        <EditPost handleClose={handleClose} post={post} />
      </Modal>
      <Box className="info" sx={{  }}>
        <Box className="opImg" sx={{ p: 1,  float: "left", justifyContent: "center", border: "1px solid red" }}>
          <div className="opInfo">
            <Avatar
              src={post.userImageUrl === null ? alt : post.userImageUrl}
              onClick={() => {
                navigate(`/profile/visit/${post.userUsername}`);
              }}
              alt=""
            />
          </div>
        </Box>
        <Box className="opName" sx={{ p: 1, width: "85%"   }}>
          <span
            style={{ color: theme === "light" ? "black" : "white"}}
            onClick={() => {
              navigate(`/profile/visit/${post.userUsername}`);
            }}
          >
            {post === null ? "" : `${post.userFirstname} ${post.userLastname}`}
          </span>

          <span style={{ color: theme === "light" ? "#424242" : "#9b9b9b"}}>{convertTime(post.datePosted)}</span>
        </Box>
        {currentUser && currentUser.id === post.userID ? (
          <Box className="options" sx={{ p: 1, float: "right"  }}>
            <IconButton onClick={handleOpenMenu} sx={{ color: theme === "light" ? "black" : "white" }}>
              <MoreHorizIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={opening}
              onClose={handleCloseMenu}
              sx={{ width: "500px", paddingTop: "-30px" }}
            >
              <MenuItem
                className="menuItem"
                sx={{ fontFamily: "montserrat" }}
                onClick={handleOpen}
              >
                <EditRoundedIcon />
                &nbsp;&nbsp;Edit
              </MenuItem>
              <MenuItem
                className="menuItem"
                sx={{ fontFamily: "montserrat" }}
                onClick={handleDeletePost}
              >
                <DeleteRoundedIcon />
                &nbsp; Move to trash
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          ""
        )}
      </Box>
      <Box className="postContent" sx={{ p: 0.2 }}>
        <div className="postContent2">
          <Box className="txtContent" sx={{ p: 0.2 }}>
            <span style={{color: theme === "light" ? "black" : "white"}}>{post.length === 0 ? "" : post.body}</span>
          </Box>
          {post && post.imageUrl === null ? (
            ""
          ) : (
            <Box
              className="imgBox"
              sx={{
                // p: 1,
                display: "flex",
                justifyContent: "center",
                width: "100%",
                paddingTop: "5px",
                paddingBottom: "5px",
                border: "none",
              }}
            >
              <img
                src={`${post.imageUrl}`}
                style={{ width: "100%", height: "70%", border: "none" }}
              />
            </Box>
          )}
          <Box className="txtContent" sx={{ p: 0.2 }}>
            <Box sx={{ width: "50%", paddingLeft: "50px" }}>
              <span style={{ color: theme === "light" ? "#333333" : "white" }}>
                {post.numLikes === 0 ? (
                  ""
                ) : (
                  <img
                    src={liked}
                    alt=""
                    style={{ width: "25px", height: "25px" }}
                  />
                )}
                &nbsp;{post.numLikes === 0 ? "" : `${post.numLikes}`}
              </span>
            </Box>

            <Box
              className="commentBox"
              sx={{
                width: "50%",
                display: "flex",
                justifyContent: "flex-end",
                paddingRight: "50px",
              }}
            >
              <span style={{ color: theme === "light" ? "#333333" : "white" }}>
                {post.numComments === 0 ? (
                  ""
                ) : (
                  <ModeCommentIcon
                    sx={{
                      color: "#ff5d75",
                      width: "15px",
                      height: "15px",
                    }}
                  />
                )}
                &nbsp;{post.numComments === 0 ? "" : `${post.numComments}`}
              </span>
            </Box>
            {/* <span> <img src={liked} style={{width: "20px", height: "20px" }}/> {`${post.numLikes}`}</span> */}
          </Box>
        </div>
      </Box>
      <Divider className="divider" sx={{ color: theme === "light" ? "#333333" : "white" }} />
      <Box
        className="reactions"
        sx={{
          p: 0.2,
          color: theme === "light" ? "#333333" : "white",
        }}
      >
        <Box className="like" sx={{ p: 0.2 }}>
          <div className="likebtn" onClick={handleChangeIcon}>
            <Button className="likeButton" sx={{ width: "280px" }}>
              {like ? <img src={liked} /> : <img src={unlike} />}
              {like ? <span style={{ color: theme === "light" ? "#333333" : "white" }}>Liked</span> : <span style={{ color: theme === "light" ? "#333333" : "white" }}>Like</span>}
            </Button>
          </div>
        </Box>
        <Divider
          className="divider2"
          sx={{ height: 28, m: 0.5, color: theme === "light" ? "#333333" : "white" }}
          orientation="vertical"
        />
        <Box className="comment" sx={{ p: 0.2 }}>
          <Button
            className="commentButton"
            sx={{ width: "280px" }}
            onClick={() => {
              navigate(`/posts/${post.postID}`);
            }}
          >
            <ModeCommentOutlinedIcon />
            <span style={{ color: theme === "light" ? "#333333" : "white" }}>Comment</span>
          </Button>
        </Box>
      </Box>
      {/* <Divider className='divider' sx={{ marginBottom:"10px" }}/> */}
    </Paper>
  );
};

export default PostComponent;
