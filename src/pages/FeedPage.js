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
      <Grid item xs={12} md={3} sx={{backgroundColor: "blue"}}>
        <ProfileSide></ProfileSide>
      </Grid>
      <Grid item xs={12} md={6} sx={{backgroundColor: "pink"}}>
        <PostSide></PostSide>
      </Grid>
      <Grid item xs={12} md={3} sx={{backgroundColor: "white"}}>
        <TrendSide></TrendSide>
      </Grid>
    </Grid>
    </div>
  )
}

export default FeedPage