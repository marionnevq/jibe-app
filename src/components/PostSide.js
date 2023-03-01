import {
  Button,
  Chip,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Paper,
  TextField,
} from "@mui/material";
import { Box, color } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import { getCurrentUser } from "../services/user";

import unlike from "../images/unlike.png";
import liked from "../images/liked.png";
import unlikeDark from "../images/unlike-dark.png";
import likedDark from "../images/liked-dark.png";
import mk from "../images/mark.jpg";
import test from "../images/test.jpg";
import dp from "../images/nik.jpg";
import Joi from "joi";

import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { getWorldPost, getFollowingPost } from "../services/post";
import { useNavigate } from "react-router-dom";
import PostForm from "./PostForm";

const PostSide = ({ theme, onPosting, setLoading }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [postDate, setPostDate] = useState("");

  const open = Boolean(anchorEl);

  const navigate = useNavigate();

  const [like, setLike] = useState(false);
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

  //  for posting
  //  const handlePost = (event) => {
  //   event.preventDefault();
  //   onPosting(post);
  //   navigate('/feed');
  // };

  //get post
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const world = await getWorldPost().then((response) => {
      console.log(response.data);
      setPosts(response.data);
    });

    const user = await getCurrentUser().then((response) => {
      setCurrentUser(response.data);
    });
    // await getWorldPost(world.data).then((userPosts) => {

    //   console.log(userPosts.data);
    // });
  };

  return (
    <div className="postSide" style={{ minWidth: "100%", marginTop: "12px" }}>
      <Grid
        container
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Grid
          container
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper
            className="feedType"
            sx={{
              width: "95%",
              height: "45px",
              paddingBottom: "2px",
              borderRadius: "0.6rem",
              boxShadow: "1",
            }}
          >
            <Box
              className="fyp"
              sx={{
                width: "25%",
                height: "45px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <span style={{ cursor: "pointer" }}>World</span>
            </Box>
            {/* <Divider orientation="vertical" variant="middle" flexItem /> */}
            <Box
              className="fyp"
              sx={{
                width: "25%",
                height: "45px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <span style={{ cursor: "pointer" }}>For You</span>
            </Box>
          </Paper>
        </Grid>

        <PostForm
          currentUser={currentUser}
          theme={theme}
          setLoading={setLoading}
        />

        <Divider className="divider">
          <Chip
            className="dividerChip"
            label="WORLD"
            sx={{ fontFamily: "Montserrat" }}
          />
        </Divider>

        <Grid
          container
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          {posts.map((post) => (
            <Paper
              className="post"
              sx={{
                width: "95%",
                minHeight: "160px",
                maxHeight: "690px",
                paddingBottom: "2px",
                borderRadius: "0.6rem",
                boxShadow: "1",
              }}
            >
              <Box className="info" sx={{ p: 0.2 }}>
                <Box className="opImg" sx={{ p: 1 }}>
                  <div className="opInfo">
                    <img
                      src={post.userImageUrl === null ? "" : post.userImageUrl}
                      alt=""
                    />
                  </div>
                </Box>
                <Box className="opName" sx={{ p: 1 }}>
                  <span>
                    {post === null
                      ? ""
                      : `${post.userFirstname} ${post.userLastname}`}
                  </span>
                  <span>a few minutes ago</span>
                </Box>
                <Box className="optionBox" sx={{ p: 1 }}>
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
              <Box className="postContent" sx={{ p: 0.2 }}>
                <div className="postContent2">
                  <Box className="txtContent" sx={{ p: 0.2 }}>
                    <span>{post.length === 0 ? "" : post.body}</span>
                  </Box>
                  <Box className="imgContent" sx={{ p: 1, display: "flex" }}>
                    <img src={`${post.imageUrl}`} style={{ width: "100%" }} />
                  </Box>
                </div>
              </Box>
              <Divider className="divider" />
              <Box className="reactions" sx={{ p: 0.2 }}>
                <Box className="like" sx={{ p: 0.2 }}>
                  <div className="likebtn" onClick={handleChangeIcon}>
                    <Button className="likeButton">
                      {like ? <img src={liked} /> : <img src={unlike} />}
                      {like ? <span>Like</span> : <span>Liked</span>}
                    </Button>
                  </div>
                </Box>
                <Box className="comment" sx={{ p: 0.2 }}>
                  <Button className="commentButton">
                    <ModeCommentOutlinedIcon />
                    <span>Comment</span>
                  </Button>
                </Box>
              </Box>
              <Divider className="divider" sx={{ marginBottom: "10px" }} />
            </Paper>
          ))}

          {/* <Paper className='post' sx={{ width:"95%", minHeight: "150px", maxHeight:"680px", paddingBottom: "2px", borderRadius:"0.6rem", boxShadow:"1"}}>
          <Box className="info" sx={{ p:0.2  }}>
             <Box className='opImg' sx={{ p: 1 }}>
               <div className="opInfo">
                 <img src={mk} alt=""/>
               </div>
             </Box>
             <Box className='opName' sx={{ p: 1 }}>
               <span>Mark Lee</span>
              <span>a few minutes ago</span>
             </Box>
             <Box sx={{ p: 1 }}>
             <IconButton className='options' onClick={handleOpenMenu}>
                    <MoreHorizIcon/>
                </IconButton>

                <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenu} className="menuBox" >
                  <MenuItem className='menuItem'  sx={{ fontFamily: "montserrat" }}>
                    <EditRoundedIcon />&nbsp;&nbsp;Edit
                  </MenuItem>
                  <MenuItem className='menuItem' sx={{ fontFamily: "montserrat" }}>
                    <DeleteRoundedIcon/>&nbsp; Move to trash
                  </MenuItem>
                </Menu>
             </Box>
           </Box>
           <Box className='postContent'  sx={{ p: 0.2 }}>
             <div className='postContent2'>
               <Box className='txtContent' sx={{ p: 0.2 }}>
                 <span>a smile at the end of a long day is something that should be appreciated more #goodnight</span>
               </Box>
             </div>
           </Box>
           <Divider className='divider' />
           <Box className='reactions' sx={{ p: 0.2 }}>
             <Box className='like' sx={{ p: 0.2 }}> 
              <div className='likebtn' onClick={handleChangeIcon}>
                <Button className='likeButton'>
                 {
                   like? <img src={liked} /> :  <img src={unlike} />
                 }
                 {
                   like? <span>Like</span> : <span>Liked</span>
                 }
                </Button>
               </div>
             </Box> 
             <Box className='comment' sx={{ p: 0.2 }}>
               <Button className='commentButton'>
                 <ModeCommentOutlinedIcon />
                 <span>Comment</span>
               </Button>
             </Box>
           </Box>
           <Divider className='divider' sx={{ marginBottom:"10px" }}/>
        </Paper> */}
        </Grid>
      </Grid>
    </div>
  );
};

export default PostSide;
