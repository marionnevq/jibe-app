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
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import PostForm from "./PostForm";
import PostComponent from "./PostComponent";
import { async } from "q";

const PostSide = ({ theme, setLoading }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const [postDate, setPostDate] = useState("");
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const [choice, setChoice]=useState(true)
  const [image, setImage] = useState(null);
  const imageRef = useRef();

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

//get post
useEffect(() => {
  loadUser();
}, []);

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
    const world = await getWorldPost().then((response) => {
      console.log(response.data);
      setPosts(response.data);
    });

  const user = await getCurrentUser().then((response) => {
    setCurrentUser(response.data);
  }); 
};

const handleWorldFollowing = async () => {
  await getWorldPost().then(async(response) => {
    console.log(response.data);
    setPosts(response.data);
  });


    await getCurrentUser().then((response) => {
    
      setCurrentUser(response.data);
    }); 
};
  
  const handleShowFollowing = async () => {
    await getFollowingPost().then((response) => {
      console.log(response.data);
      setPosts(response.data);
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
              onClick={handleWorldFollowing}
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
              onClick={handleShowFollowing}
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

      <Grid container item xs={12} sx={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: "10px"}}>
     
          <Paper className='post' sx={{ width:"95%", minHeight: "120px", maxHeight:"680px", paddingBottom: "2px", borderRadius:"0.6rem", boxShadow:"1"}}>
           <Box className="postInfo">
            <Box className='postDp' sx={{ p: 1 }}>
                <div className="postDp2">
                  <img src={currentUser === null ? " " : `${currentUser.imageUrl}`} alt=""/>
                </div>
              </Box>
              <Box className='postText' sx={{ p: 1}}>
                <TextField className='shareText' placeholder="What's jibin'?" sx={{ width: "100%" }}
                  InputProps={{ className: "inputTextfield", sx: { height: "auto", fontFamily: "montserrat" } }} multiline/>
              </Box>
            <Box className='postPhoto' sx={{ p: 0.5}}>
              <PhotoIcon onClick={() => imageRef.current.click()} sx={{ cursor:"pointer", fontSize: "30px" }} />
            </Box>
           </Box>
            <div style={{ display: "none"}}>
              <input type='file' name='myImage' ref={imageRef} onChange={onImageChange} />
            </div>
              { image && (
                  <Box className="previewBox" sx={{ p: 0.5, border: '1px solid #d3d3d3', borderRadius:"7px" }}>
                    <div className='previewImage'>
                      <Box className="previewClose" sx={{ marginBottom:"-10px" }}>
                        <CancelRoundedIcon onClick={() => setImage(null)}  sx={{cursor: "pointer", justifyContent:"right"}}/>
                      </Box>
                      <img src={image.image} />
                  </div>
                  </Box>
              )}
            <Divider className='divider' />
            <Box className='sharebtn' justifyItems={"center"} sx={{ p: 0.5 }}>
              <Button className='shareButton' variant='text' 
                style={{ backgroundColor: "transparent", color:"#EB4660", fontFamily: 'Montserrat', height:"30px", fontSize:"16px", }} >
                  Post</Button>
            </Box>
          </Paper>
      </Grid>

      <Divider className='divider' sx={{ borderBottomWidth: 3 }}><Chip className='dividerChip' label="World" sx={{ fontFamily: 'Montserrat'}} /></Divider>

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
         <PostComponent post={post} currentUser={currentUser} />))}
        </Grid>
      </Grid>
    </div>
  );
};

export default PostSide;
