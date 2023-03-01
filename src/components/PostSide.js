import {
  Avatar,
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
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import unlike from "../images/unlike.png";
import liked from "../images/liked.png";
import alt from "../images/alternate.jpg";
import PhotoIcon from "@mui/icons-material/Photo";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { getWorldPost, getFollowingPost } from "../services/post";
import { useNavigate } from "react-router-dom";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import ModeCommentIcon from '@mui/icons-material/ModeComment';

const PostSide = ({ theme }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  // const [postDate, setPostDate] = useState("");
  const [image, setImage] = useState(null);
  const open = Boolean(anchorEl);
  const imageRef = useRef();
  const navigate = useNavigate();

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage({
        image: URL.createObjectURL(img),
      });
    }
  };

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

  const convertTime = (postDate) => {
    TimeAgo.addLocale(en);
    const timeAgo = new TimeAgo("en-US");
    const ago = timeAgo.format(new Date(postDate));
    return ago;
  };

  //get post
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    await getWorldPost().then((response) => {
      console.log(response.data);
      setPosts(response.data);
    });

    await getCurrentUser().then((response) => {
      setCurrentUser(response.data);
    });
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
          <Paper
            className="post"
            sx={{
              width: "95%",
              minHeight: "120px",
              maxHeight: "680px",
              paddingBottom: "2px",
              borderRadius: "0.6rem",
              boxShadow: "1",
            }}
          >
            <Box className="postInfo">
              <Box className="postDp" sx={{ p: 1 }}>
                <div className="postDp2">
                  {/* <img
                    src={currentUser === null ? " " : `${currentUser.imageUrl}`}
                    alt=""
                  /> */}
                  <Avatar
                    className="profile-img"
                    sx={{ width: "50px", height: "50px" }}
                    src={currentUser === null ? alt : currentUser.imageUrl}
                    onClick={() => {
                      navigate(`/profile/${currentUser.username}`);
                    }}
                  ></Avatar>
                </div>
              </Box>
              <Box className="postText" sx={{ p: 1 }}>
                <TextField
                  className="shareText"
                  placeholder="What's jibin'?"
                  sx={{ width: "100%" }}
                  InputProps={{
                    className: "inputTextfield",
                    sx: {
                      height: "auto",
                      fontFamily: "montserrat",
                      color: () => (theme === "dark" ? "white" : "black"),
                    },
                  }}
                  multiline
                />
              </Box>
              <Box className="postPhoto" sx={{ p: 0.5 }}>
                <PhotoIcon
                  onClick={() => imageRef.current.click()}
                  sx={{ cursor: "pointer", fontSize: "30px" }}
                />
              </Box>
            </Box>
            <div style={{ display: "none" }}>
              <input
                type="file"
                name="myImage"
                ref={imageRef}
                onChange={onImageChange}
              />
            </div>
            {image && (
              <Box
                className="previewBox"
                sx={{
                  p: 0.5,
                  border: "1px solid #d3d3d3",
                  borderRadius: "7px",
                }}
              >
                <div className="previewImage">
                  <Box className="previewClose" sx={{ marginBottom: "-10px" }}>
                    <CancelRoundedIcon
                      onClick={() => setImage(null)}
                      sx={{ cursor: "pointer", justifyContent: "right" }}
                    />
                  </Box>
                  <img src={image.image} />
                </div>
              </Box>
            )}
            <Divider className="divider" />
            <Box className="sharebtn" justifyItems={"center"} sx={{ p: 0.5 }}>
              <Button
                className="shareButton"
                variant="text"
                style={{
                  backgroundColor: "transparent",
                  color: "#EB4660",
                  fontFamily: "Montserrat",
                  height: "30px",
                  fontSize: "16px",
                }}
              >
                Post
              </Button>
            </Box>
          </Paper>
        </Grid>

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

                height: "auto",
                paddingBottom: "2px",
                borderRadius: "0.6rem",
                boxShadow: "3",
              }}
            >
              <Box className="info" sx={{ p: 0.2 }}>
                <Box className="opImg" sx={{ p: 1 }}>
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
                <Box className="opName" sx={{ p: 1 }}>
                  <span
                    onClick={() => {
                      navigate(`/profile/visit/${post.userUsername}`);
                    }}
                  >
                    {post === null
                      ? ""
                      : `${post.userFirstname} ${post.userLastname}`}
                  </span>

                  <span>{convertTime(post.datePosted)}</span>
                </Box>
                {/* <Box className="optionBox" sx={{ p: 1 }}>

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

                </Box> */}
              </Box>
              <Box className="postContent" sx={{ p: 0.2 }}>
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
                        p: 1,
                        display: "flex",
                        justifyContent: "center",
                        width: "95%",
                        marginLeft: "23px",

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
                  <Box className="txtContent" sx={{ p: 0.2 }}>
                    <span>
                      {post.numLikes === 0 ? "" : <img src={liked} alt="" style={{width: "25px", height: "25px"}}/>}
                      {post.numLikes === 0 ? "" : `${post.numLikes}`}
                    </span>
                    <span>
                      {post.numComments === 0 ? "" : <ModeCommentIcon sx={{ color: "#ff5d75", width: "15px", height: "15px"}} />}
                      {post.numComments === 0 ? "" : `${post.numComments}`}
                    </span>
                    {/* <span> <img src={liked} style={{width: "20px", height: "20px" }}/> {`${post.numLikes}`}</span> */}
                  </Box>
                </div>
              </Box>
              {/* <Divider className='divider'/> */}
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
              {/* <Divider className='divider' sx={{ marginBottom:"10px" }}/> */}
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
