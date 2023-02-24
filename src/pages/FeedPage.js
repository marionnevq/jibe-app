import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import Like1 from '../images/likeone.png'
import Like2 from '../images/likewo.png'
import header from '../images/header.jpg'
import dp from '../images/nik.jpg'
import "../style/Feed.css"
import { Button, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const FeedPage = ({onLogout, onSwitch, theme}) => {

  const navigate = useNavigate();

  const GoToProfile = async (event) => {
    // navigate("/profile/:username")
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
    <div data-theme={theme}>
    <NavBar onLogout={onLogout} onSwitch={onSwitch} theme={theme}/>
    <Box sx={{ flexGrow: 1 }}>
    <Grid container style={{ minHeight: "100vh", marginTop: "8px"}} spacing={2}>
      
      {/*Profile Side*/}
      <Grid className='profileSide' item xs>
        <Paper className='profile' sx={{width: "90%", height: "60%", paddingBottom: "15px", borderRadius:"0.6rem", boxShadow:"2"}}>
          <Paper className='header' sx={{width: "100%", height: "25%", backgroundImage: `url(${header})`, paddingBottom: "15px", borderRadius:"0.6rem", boxShadow:"0"}}/>
          <img src={dp} alt=""/>
          <Grid container xs={12} className="names">
              <h3>Nikki Fagara</h3>
              <p>@nikkifagara</p>
          </Grid>
          <Divider variant="fullWidth" />
          <div className='followerPart'>
            <Box className='followers' sx={{ p: 1.5 }}>
              <span>802</span>
              <span>Followers</span>
            </Box>
            <Box className='following' sx={{ p: 1.5 }}>
              <span>521</span>
              <span>Following</span>
            </Box>
          </div>
          <Divider variant="fullWidth" />
          <Box className='goProfile' justifyItems={"center"} sx={{ p: 1.5 }}>
            <Button className='myProfile' variant='secondary' onClick={GoToProfile} sx={{ backgroundColor: "primary"}}>My Profile</Button>
          </Box>
          <Divider variant="fullWidth" />
        </Paper>
      </Grid>

      {/*Post Side*/}
      <Grid className='postSide' item xs={6}>

        <div className='feedType'>
          <Box className='world' display="flex" justifyContent="center" alignItems="center" sx={{ p: 1.5 }}>
            <span style={{ color: "black", cursor: "pointer"}}>World</span>
          </Box>
          <Box className='fyp' justifyItems={"center"} sx={{ p: 1.5 }} >
            <span style={{ color: "black", cursor: "pointer"}}>For You</span>
          </Box>
        </div>

        {/*Post Share Part*/}
        <Paper className='post' sx={{width: "97.5%", height: "13%", backgroundColor: "white", paddingBottom: "15px", borderRadius:"0.6rem", boxShadow:"2"}}>
          <img src={dp} alt=""/>
          <input type={"text"} placeholder="What's jibin'?" />
        </Paper>
      </Grid>

      {/*Widget Trend Side*/}
      <Grid  className='trendSide' item xs={3}>
      Krishna
      </Grid>
    </Grid>
   </Box>
    
    </div>
  )
}

export default FeedPage