import { Button, Divider, Grid, IconButton, InputBase, Paper, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { useRef, useState } from 'react'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import unlike from '../images/unlike.png'
import liked from '../images/liked.png'
import mk from '../images/mark.jpg'
import test from '../images/test.jpg'
import dp from '../images/nik.jpg'
import PhotoIcon from '@mui/icons-material/Photo';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import { MoreVert } from '@mui/icons-material';

const PostSide = () => {

  const [image, setImage] = useState(null);
  const imageRef = useRef();

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


  return (
    <div className='postSide' style={{ minWidth: "100%", marginTop: "10px"}}>
    <Grid container sx={{display: "flex", justifyContent: "center", alignItems: "center"}} spacing={1}>
      
      <Grid container item xs={12} sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
        <Paper className='feedType' sx={{ width:"95%", height:"45px", paddingBottom: "2px", borderRadius:"0.6rem", boxShadow:"3"}}>
            <Box className='world' sx={{ width:"25%", height:"45px", display:"flex", justifyContent:"center", alignItems:"center" }}>
              <span style={{ cursor: "pointer"}}>World</span>
            </Box>
            <Box className='fyp' sx={{ width:"25%", height:"45px",  display:"flex", justifyContent:"center", alignItems:"center"  }} >
              <span style={{ cursor: "pointer"}}>For You</span>
            </Box>
          </Paper>
      </Grid>

      <Grid container item xs={12} sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
          <Paper className='post' sx={{ width:"95%", minHeight: "120px", maxHeight:"680px", paddingBottom: "2px", borderRadius:"0.6rem", boxShadow:"3"}}>
           <Box className="postInfo">
            <Box className='postDp' sx={{ p: 1 }}>
                <div className="postDp2">
                  <img src={dp} alt=""/>
                </div>
              </Box>
              <Box className='postText' sx={{ p: 1}}>
                <TextField className='shareText' placeholder="What's jibin'?" sx={{ width: "100%" }}
                  InputProps={{  sx: { height: "auto" } }} multiline/>
              </Box>
            <Box className='postPhoto' sx={{ p: 0.5}}>
              <PhotoIcon onClick={() => imageRef.current.click()} sx={{ cursor:"pointer", fontSize: "40px" }} />
            </Box>
           </Box>
            <div style={{ display: "none"}}>
              <input type='file' name='myImage' ref={imageRef} onChange={onImageChange} />
            </div>
              { image && (
                  <Box className="previewBox" sx={{ p: 0.5, border: '1px solid #d3d3d3', borderRadius:"7px" }}>
                    <div className='previewImage'>
                      <Box className="previewClose" sx={{ p:0.5 }}>
                        <CancelRoundedIcon onClick={() => setImage(null)}  sx={{cursor: "pointer", justifyContent:"right"}}/>
                      </Box>
                      <img src={image.image} />
                  </div>
                  </Box>
              )}
            <Divider />
            <Box className='sharebtn' justifyItems={"center"} sx={{ p: 0.5 }}>
              <Button className='shareButton' variant='text' 
                style={{ backgroundColor: "transparent", color:"#EB4660", fontFamily: 'Montserrat', height:"30px", fontSize:"16px", }} >
                  Post</Button>
            </Box>
          </Paper>
      </Grid>

      <Divider sx={{marginTop:"5px", fontSize:"10px" }}>WORLD</Divider>

      <Grid container item xs={12} sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
        <Paper className='post' sx={{ width:"95%", minHeight: "160px", maxHeight:"690px", paddingBottom: "2px", borderRadius:"0.6rem", boxShadow:"3"}}>
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
             <Box className='options' sx={{ p: 1 }}>
               <MoreVert/>
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
           <Divider />
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
           <Divider sx={{ marginBottom:"10px" }}/>
        </Paper>

        <Paper className='post' sx={{ width:"95%", minHeight: "150px", maxHeight:"680px", paddingBottom: "2px", borderRadius:"0.6rem", boxShadow:"3"}}>
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
             <Box className='options' sx={{ p: 1 }}>
               <MoreVert/>
             </Box>
           </Box>
           <Box className='postContent'  sx={{ p: 0.2 }}>
             <div className='postContent2'>
               <Box className='txtContent' sx={{ p: 0.2 }}>
                 <span>a smile at the end of a long day is something that should be appreciated more #goodnight</span>
               </Box>
             </div>
           </Box>
           <Divider />
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
           <Divider sx={{ marginBottom:"10px" }}/>
        </Paper>

      </Grid>

    </Grid>
    </div>
  )
}

export default PostSide