import { Avatar, Button, Divider, Grid, IconButton, Paper } from '@mui/material'
import React, { useState } from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import bg1 from "../images/bg1.jpg"
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import alt from "../images/alternate.jpg"
import unlike from '../images/unlike.png'
import liked from '../images/liked.png'
import { Box } from '@mui/system';

const PostVisit = () => {

    const [like, setLike] = useState(false);

    const handleChangeIcon = () =>{
      if(like === false){
        setLike(true);
      } else {
        setLike(false);
      }
    }

  return (
    <div style={{display: "flex", justifyContent: "center", marginTop: "10px"}}>
       <Paper className='post' sx={{ width:"95%", height: "auto", paddingBottom: "2px", borderRadius:"0.6rem", boxShadow:"3"}}>
          <Box className="info" sx={{ p:0.2  }}>
             <Box className='opImg' sx={{ p: 1 }}>
               <div className="opInfo">
                 <img src={alt} alt=""/>
               </div>
             </Box>
             <Box className='opName' sx={{ p: 1 }}>
               <span>Mark Lee</span>
              <span>a few minutes ago</span>
             </Box>
             <Box className='options' sx={{ p: 1 }}>
                <IconButton>
                <MoreHorizIcon/>
                </IconButton>
             </Box>
           </Box>
           <Box className='postContent'  sx={{ p: 0.2 }}>
            <div className='postContent2'>
             <Box className='txtContent' sx={{ p: 0.2 }}>
                 <span>#NewHeader</span>
               </Box>
               <Box className='imgContent' sx={{ p: 1, display:"flex", height: "auto"}}>
                 <img src={bg1} style={{ width:"100%" }}/>
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
             <Divider className='divider' sx={{ height: 28, m: 0.5 }} orientation="vertical" />
             <Box className='comment' sx={{ p: 0.2 }}>
               <Button className='commentButton'>
                 <ModeCommentOutlinedIcon />
                 <span>Comment</span>
               </Button>
             </Box>
           </Box>
           <Divider sx={{ marginBottom:"10px" }}/>
        </Paper>
    </div>
  )
}

export default PostVisit