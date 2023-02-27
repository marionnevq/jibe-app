import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import React, { useEffect, useRef, useState } from 'react'
import NavBar from '../components/NavBar'
import unlike from '../images/unlike.png'
import liked from '../images/liked.png'
import h1 from '../images/h1.png'
import dp from '../images/nik.jpg'
import mk from '../images/mark.jpg'
import test from '../images/test.jpg'
import postImg from '../images/img.png'
import "../style/Feed.css"
import { Button, Chip, Divider, IconButton, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import { MoreVert } from '@mui/icons-material';
import ProfileSide from '../components/ProfileSide';
import PostSide from '../components/PostSide';
import TrendSide from '../components/TrendSide';

const FeedPage = ({onLogout, onSwitch, theme}) => {

  const [image, setImage] = useState(null);
  const imageRef = useRef();

  const onImageChange = (event) => {
    if(event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage({
        image: URL.createObjectURL(img),
      });
    }
  };

  const navigate = useNavigate();

  const GoToProfile = async (event) => {
    navigate("/profile/:username")
};

  const [like, setLike] = useState(false);

  const handleChangeIcon = () =>{
    if(like === false){
      setLike(true);
    } else {
      setLike(false);
    }
  }

  return (
  <div data-theme={theme} className="parent">
    <NavBar onLogout={onLogout} onSwitch={onSwitch} theme={theme}/>
    <Grid container sx={{ minHeight: "100vh" }}>
      <Grid item xs={12} md={3} className="body">
        <ProfileSide></ProfileSide>
      </Grid>
      <Grid item xs={12} md={6} className="body">
        <PostSide></PostSide>
      </Grid>
      <Grid item xs={12} md={3} className="body">
        <TrendSide></TrendSide>
      </Grid>
    </Grid>
    </div>
  //   <div data-theme={theme} className="parent">
  //   
  //  <Box className="Feed" sx={{ flexGrow: 1 }}>
  //   <Grid container style={{ minHeight: "150vh"}}>
      
  //     {/*Profile Side*/}
  //     <Grid className='profileSide' item xs>
  //       <Box className='profile' sx={{  width: "90%", height: "280px", paddingBottom: "10px", borderRadius:"0.6rem", boxShadow:"2"}}>
  //         <Box className='header' sx={{width: "300px", height: "90px", backgroundImage: `url(${h1})`, paddingBottom: "15px", borderRadius:"0.6rem"}}/>
  //         <Box className='profileDp'>
  //             <img src={dp} alt=""/>
  //         </Box>
  //         <Box className="names" >
  //           <Box className="name">
  //             <span>Nikki Fagara</span>
  //           </Box>
  //           <Box className="username">
  //           <span>@nikkifagara</span>
  //           </Box>
  //         </Box>
  //         <Divider variant="fullWidth" />
  //         <div className='followerPart'>
  //           <Box className='followers' sx={{ p: 1 }}>
  //             <span>802</span>
  //             <span>Followers</span>
  //           </Box>
  //           <Box className='following' sx={{ p: 1 }}>
  //             <span>521</span>
  //             <span>Following</span>
  //           </Box>
  //         </div>
  //         <Divider variant="fullWidth" />
  //       </Box>
  //     </Grid>


  //     {/*Post Side*/}
  //     <Grid className='postSide' item xs={6}>

  //       <Box className='feedType' sx={{ border: '1px dashed grey' }}>
  //         <Box className='world' display="flex" justifyContent="center" alignItems="center" sx={{ p: 1.5 }}>
  //           <a style={{ color: "black", cursor: "pointer"}}>World</a>
  //         </Box>
  //         <Box className='fyp' justifyItems={"center"} sx={{ p: 1.5 }} >
  //           <a style={{ color: "black", cursor: "pointer"}}>For You</a>
  //         </Box>
  //       </Box>

  //       {/*Post Share Part*/}
  //       <Grid container className='post' sx={{ width: "97.5%", minHeight: "70px", maxHeight:"680px", paddingBottom: "2px", borderRadius:"0.6rem", boxShadow:"3"}}>
  //         <Box className='postDp' sx={{ p: 1}}>
  //           <div className="postDp2">
  //             <img src={dp} alt=""/>
  //           </div>
  //         </Box>
  //         <Box className='postText' sx={{ p: 1 }}>
  //           <TextField className='shareText' placeholder="What's jibin'?" multiline/>
  //         </Box>
  //         <Box className='postPhoto' sx={{ p: 1 }}>
  //           <img className='postImage' src={postImg} alt="" onClick={() => imageRef.current.click()}/>
  //         </Box>
  //         <div style={{ display: "none"}}>
  //           <input type='file' name='myImage' ref={imageRef} onChange={onImageChange} />
  //         </div>
  //         { image && (
  //             <Box className="previewBox" sx={{ p: 1 }}>
  //               <div className='previewImage'>
  //                 <CloseIcon onClick={() => setImage(null)}/>
  //                 <img src={image.image} />
  //             </div>
  //             </Box>
  //         )}
  //         <Divider />
  //         <Box className='sharebtn' justifyItems={"center"} sx={{ p: 0.5 }}>
  //           <Button className='shareButton' variant='text' 
  //             style={{ backgroundColor: "transparent", color:"#EB4660", fontFamily: 'Montserrat', height:"30px", fontSize:"15px", }} >
  //               Share</Button>
  //         </Box>
          
  //       </Grid>

  //       {/* <Divider>
  //         <Chip label="WORLD" />
  //       </Divider> */}

  //       {/*Posts Part*/}
  //       <Grid container className='sharedPost' sx={{ width: "97.5%", minHeight: "180px", maxHeight:"1000px", backgroundColor: "white", paddingBottom: "15px", borderRadius:"0.6rem", boxShadow:"3"}}>
  //         <Box className="info" sx={{ p:0.2  }}>
  //           <Box className='opImg' sx={{ p: 1 }}>
  //             <div className="opInfo">
  //               <img src={mk} alt=""/>
  //             </div>
  //           </Box>
  //           <Box className='opName' sx={{ p: 1 }}>
  //             <span>Mark Lee</span>
  //             <span>a few minutes ago</span>
  //           </Box>
  //           <Box className='options' sx={{ p: 1 }}>
  //             <MoreVert/>
  //           </Box>
  //         </Box>
  //         <Box className='postContent'  sx={{ p: 0.2 }}>
  //           <div className='postContent2'>
  //             <Box className='txtContent' sx={{ p: 0.2 }}>
  //               <span>a smile at the end of a long day is something that should be appreciated more #goodnight</span>
  //             </Box>
  //             {/* <Box className='imgContent' sx={{ p: 1.5 }}>
  //               <img src={test}/>
  //             </Box> */}
  //           </div>
  //         </Box>
  //         <Divider />
  //         <Box className='reactions' sx={{ p: 0.2 }}>
  //           <Box className='like' sx={{ p: 0.2 }}> 
  //             <div className='likebtn' onClick={handleChangeIcon}>
  //              <Button className='likeButton'>
  //               {
  //                 like? <img src={liked} /> :  <img src={unlike} />
  //               }
  //               {
  //                 like? <span>Like</span> : <span>Liked</span>
  //               }
  //              </Button>
  //             </div>
  //           </Box> 
            
  //           <Box className='comment' sx={{ p: 0.2 }}>
  //             <Button className='commentButton'>
  //               <ModeCommentOutlinedIcon />
  //               <span>Comment</span>
  //             </Button>
  //           </Box>
  //         </Box>
  //         <Divider />
  //       </Grid>

  //       <Grid container className='sharedPost' sx={{width: "97.5%", minHeight: "30%", maxHeight:"100%", backgroundColor: "white", paddingBottom: "15px", borderRadius:"0.6rem", boxShadow:"3"}}>
  //         <Box className="info" sx={{ p:0.2 }}>
  //           <Box className='opImg' sx={{ p: 1 }}>
  //             <div className="opInfo">
  //               <img src={mk} alt=""/>
  //             </div>
  //           </Box>
  //           <Box className='opName' sx={{ p: 1 }}>
  //             <span>Mark Lee</span>
  //             <span>a few minutes ago</span>
  //           </Box>
  //           <Box className='options' sx={{ p: 1 }}>
  //             <MoreVert/>
  //           </Box>
  //         </Box>
  //         <Box className='postContent'  sx={{ p: 0.2}}>
  //           <div className='postContent2'>
  //             <Box className='txtContent' sx={{ p: 0.2 }}>
  //               <span>#NewHeader</span>
  //             </Box>
  //             <Box className='imgContent' sx={{ p: 1.5 }}>
  //               <img src={test}/>
  //             </Box>
  //           </div>
  //         </Box>
  //         <Divider />
  //         <Box className='reactions' sx={{ p: 0.2 }}>
  //           <Box className='like' sx={{ p: 0.5 }}> 
  //             <div className='likebtn' onClick={handleChangeIcon}>
  //              <Button className='likeButton'>
  //               {
  //                 like? <img src={liked} /> :  <img src={unlike} />
  //               }
  //               {
  //                 like? <span>Like</span> : <span>Liked</span>
  //               }
  //              </Button>
  //             </div>
  //           </Box> 
            
  //           <Box className='comment' sx={{ p: 0.5 }}>
  //             <Button className='commentButton'>
  //               <ModeCommentOutlinedIcon />
  //               <span>Comment</span>
  //             </Button>
  //           </Box>
  //         </Box>
  //         <Divider />
  //       </Grid>
  //     </Grid>

  //     {/*Widget/Trend Side*/}
  //     <Grid className='trendSide' item xs>
  //       <Box className='trend' sx={{width: "96%", height: "400px", paddingBottom: "15px", borderRadius:"0.6rem", boxShadow:"2"}}>
  //         <Box className='headerTitle' sx={{ p: 0.5}}>
  //           <h3>Talks for you</h3>
  //         </Box>
  //         <Divider />
  //         <Grid container className='topics' xs={12} sx={{ height: "320px", p: 0.5 }}>
  //           <Box className='trendTopics' xs={12} sx={{ height: "60px", p: 1.5 }}>
  //             <span>#MarkGoSolo</span>
  //             <span>8.02M talks</span>
  //           </Box>
  //           <Divider />
  //           <Box className='trendTopics' xs={12} sx={{ height: "60px", p: 1.5 }}>
  //             <span>#MarkGoSolo</span>
  //             <span>8.02M talks</span>
  //           </Box>
  //           <Divider />
  //           <Box className='trendTopics' xs={12} sx={{ height: "60px", p: 1.5 }}>
  //             <span>#MarkGoSolo</span>
  //             <span>8.02M talks</span>
  //           </Box>
  //           <Divider />
  //           <Box className='trendTopics' xs={12} sx={{ height: "60px", p: 1.5 }}>
  //             <span>#MarkGoSolo</span>
  //             <span>8.02M talks</span>
  //           </Box>
  //           <Divider />
  //           <Box className='trendTopics' xs={12} sx={{ height: "60px", p: 1.5 }}>
  //             <span>#MarkGoSolo</span>
  //             <span>8.02M talks</span>
  //           </Box>
  //           <Divider />
  //         </Grid>
  //       </Box>
  //     </Grid>
  //   </Grid>
  //  </Box>
    
  //   </div>
  )
}

export default FeedPage