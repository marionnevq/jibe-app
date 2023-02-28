import { Button, Chip, Divider, Grid, IconButton, InputBase, Menu, MenuItem, Paper, TextField } from '@mui/material'
import { Box, color } from '@mui/system'
import React, { useEffect, useRef, useState } from 'react'
import { getCurrentUser } from '../services/user'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import unlike from '../images/unlike.png'
import liked from '../images/liked.png'
import unlikeDark from '../images/unlike-dark.png'
import likedDark from '../images/liked-dark.png'
import mk from '../images/mark.jpg'
import test from '../images/test.jpg'
import dp from '../images/nik.jpg'
import Joi from "joi"
import PhotoIcon from '@mui/icons-material/Photo';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { getWorldPost, getFollowingPost } from '../services/post';
import { useNavigate } from 'react-router-dom';


const PostSide = ({ theme, onPosting }) => {

  const [currentUser, setCurrentUser] = useState(null);
  const [posts, setPost] = useState([])
  const [image, setImage] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [postDate, setPostDate] = useState("");

 
 
  const open = Boolean(anchorEl);
  const imageRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    loadUser();
},[])

const loadUser = async() => {
    const current = await getCurrentUser();
    setCurrentUser(current.data);
    const worldPost = await getWorldPost();
    setPost(worldPost.data);
    console.log(worldPost.data);
    // const fypPost = await getFollowingPost();
    // setPost(fypPost.data);
}

  const onImageChange = (event) => {
    if(event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage({
        image: URL.createObjectURL(img),
      });
    }
  }

  const [like, setLike] = useState(false);
  const handleChangeIcon = () =>{
    if(like === false){
      setLike(true);
    } else {
      setLike(false);
    }
  }

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

//  for posting
 const handlePost = (event) => {
  event.preventDefault();
  onPosting(posts);
  navigate('/feed');
};

//get post




  return (
    <div className='postSide' style={{ minWidth: "100%", marginTop: "12px"}}>
    <Grid container sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
      
      <Grid container item xs={12} sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
        <Paper className='feedType' sx={{ width:"95%", height:"45px", paddingBottom: "2px", borderRadius:"0.6rem", boxShadow:"1"}}>
            <Box className='fyp' sx={{ width:"25%", height:"45px",  display:"flex", justifyContent:"center", alignItems:"center"  }} >
              <span style={{ cursor: "pointer"}}>World</span>
            </Box>
            {/* <Divider orientation="vertical" variant="middle" flexItem /> */}
            <Box className='fyp' sx={{ width:"25%", height:"45px",  display:"flex", justifyContent:"center", alignItems:"center"  }} >
              <span style={{ cursor: "pointer"}}>For You</span>
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
                  InputProps={{ className: "inputTextfield", sx: { height: "auto", fontFamily: "montserrat", color: (() => theme === "dark" ? "white" : "black") } }} multiline/>
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
            <Divider className='divider'/>
            <Box className='sharebtn' justifyItems={"center"} sx={{ p: 0.5 }}>
              <Button className='shareButton' variant='text' 
                style={{ backgroundColor: "transparent", color:"#EB4660", fontFamily: 'Montserrat', height:"30px", fontSize:"16px", }} >
                  Post</Button>
            </Box>
          </Paper>
      </Grid>

      <Divider className='divider'><Chip className='dividerChip' label="WORLD" sx={{ fontFamily: 'Montserrat'}} /></Divider>

      <Grid container item xs={12} sx={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: "10px"}}>
        
          <Paper className='post' sx={{ width:"95%", minHeight: "160px", maxHeight:"690px", paddingBottom: "2px", borderRadius:"0.6rem", boxShadow:"1"}}>
          
          <Box className="info" sx={{ p:0.2  }}>
             <Box className='opImg' sx={{ p: 1 }}>
               <div className="opInfo">
                 <img src={mk} alt=""/>
               </div>
             </Box>
             <Box className='opName' sx={{ p: 1 }}>
               <span>Nikki</span>
              <span>a few minutes ago</span>
             </Box>
             <Box className="optionBox" sx={{ p: 1 }}>
                <IconButton className='options' onClick={handleOpenMenu}>
                    <MoreHorizIcon/>
                </IconButton>

                <Menu
                  // id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleCloseMenu}
                  className="menu"
                >
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
                 <span>#NewHeader</span>
               </Box>
               <Box className='imgContent' sx={{ p: 1, display:"flex" }}>
                 <img src={test} style={{ width:"100%" }}/>
               </Box>
             </div>
           </Box>
           <Divider className='divider'/>
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
        </Paper>
        

        <Paper className='post' sx={{ width:"95%", minHeight: "150px", maxHeight:"680px", paddingBottom: "2px", borderRadius:"0.6rem", boxShadow:"1"}}>
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
        </Paper>

      </Grid>
    </Grid>
    </div>
  )
}

export default PostSide