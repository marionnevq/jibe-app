import { Avatar, Button, Divider, Grid, Paper, TextField } from '@mui/material'
import { Box } from '@mui/system';
import React, { useState, useEffect, useRef } from 'react'
import NavBar from '../components/NavBar';
import "../style/Profile.css"
import PhotoIcon from "@mui/icons-material/Photo";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { getUser } from "../services/auth";

import EditIcon from '@mui/icons-material/Edit';
import ProfilePostArea from '../components/ProfilePostArea';

const ProfilePage = ({onLogout, onSwitch, theme }) => {

  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState(null);
  const imageRef = useRef();

  
  const [currentUser, setCurrentUser] = useState("");
  

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const current = await getUser();
    setCurrentUser(current.data);    
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage({
        image: URL.createObjectURL(img),
      });
    }
  };


  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div data-theme={theme}>
      <NavBar onLogout={onLogout} onSwitch={onSwitch} theme={theme} />
    <div style={{minHeight: "100vh"}} >
      <Box className="cover" id="header"/>
      
      <Grid container className='main-header'>
        <Grid  className='top-head' id='info-head' container item xs={12} md={3.5} sx={{display: "flex", justifyContent: "center", alignItems: "center"}} >
        <Avatar className='profile-img' src={currentUser === null ? "" : currentUser.imageUrl} ></Avatar>
        </Grid>
        
        <Grid className='bottom-head' id='info-head' container item xs={12} md={8.5} sx={{height: "auto"}}>
        <div className='web' >
          <Grid id='details' item xs={12} md={2.5} sx={{display: "block", textAlign: "center", lineHeight: "10px"}}>
            <h3 style={{fontSize: "21px", fontFamily: "montserrat", fontWeight: "500"}}>1298</h3>
            <h1 style={{fontSize: "18px", fontFamily: "montserrat"}}>Posts</h1>
          </Grid>
          <Grid id='details' item xs={12} md={2.5} sx={{display: "block", textAlign: "center", lineHeight: "10px"}}>
            <h3 style={{fontSize: "21px", fontFamily: "montserrat", fontWeight: "500"}}>5.6m</h3>
            <h1 style={{fontSize: "18px", fontFamily: "montserrat"}}>Followers</h1>
          </Grid>
          <Grid id='details' item xs={12} md={2.5} sx={{display: "block", textAlign: "center", lineHeight: "10px"}}>
            <h3 style={{fontSize: "21px", fontFamily: "montserrat", fontWeight: "500"}}>3</h3>
            <h1 style={{fontSize: "18px", fontFamily: "montserrat"}}>Following</h1>
          </Grid>
          <Grid id='button-follow'item xs={12} md={3} sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Button variant='outlined' className='latch-btn1' sx={{fontWeight: "bold", border: "2px solid #ff5d75"}} fullWidth><EditIcon sx={{marginRight: "10px"}}/> Edit</Button>
          </Grid></div>
        </Grid>
        
        <div className='mobile' style={{display: "block"}}>
          <div className='name-info' >
              <h1>{currentUser === null
                      ? ""
                      : `${currentUser.firstname} ${currentUser.lastname}`}</h1>
              <h3>@{currentUser === null ? "" : `${currentUser.username}`}</h3>
          </div>
        <Grid  container sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "auto", marginTop: "30px"}}>
          <div className='mobile-items'>
            <h3 style={{fontSize: "21px", fontFamily: "montserrat"}}>1298</h3>
            <h1 style={{fontSize: "18px", fontFamily: "montserrat"}}>Posts</h1>
          </div>
          <div className='mobile-items'>
            <h3 style={{fontSize: "21px", fontFamily: "montserrat"}}>5.6m</h3>
            <h1 style={{fontSize: "18px", fontFamily: "montserrat"}}>Followers</h1>
          </div>
          <div className='mobile-items'>
            <h3 style={{fontSize: "21px", fontFamily: "montserrat"}}>3</h3>
            <h1 style={{fontSize: "18px", fontFamily: "montserrat"}}>Following</h1>
          </div>
        </Grid>
      </div>
      <Divider className='divider-mobile'/>
      <div className='button'>
      <Grid  container item >
          <Grid item sx={{display: "flex", justifyContent: "center", alignItems: "center", width: "100%"}}>
            <Button className='btn-latch' variant='outlined'><EditIcon sx={{marginRight: "10px"}}/> Edit</Button>
          </Grid>
        </Grid></div>
      </Grid>
      <Paper className='bottom-foot'>
        <Grid container className= 'foot' style= {{height: "auto"}}>
          <Grid className='left' item xs={12} md={3.5} sx={{display: "flex", flexDirection:"column", marginTop: "10px"}}>
            <Paper className='window-name' style={{width: "95%", borderRadius:"0.6rem", boxShadow: "none", height: "auto", paddingRight: "10px", paddingLeft: "10px", wordBreak: "break-word"}} >
            <h1>{currentUser === null
                      ? ""
                      : `${currentUser.firstname} ${currentUser.lastname}`}</h1>
              <h3>@{currentUser === null ? "" : `${currentUser.username}`}</h3>
                <Divider className='divider-info' />
                <h4><em>
                      {`${currentUser.bio}` === ""
                        ? "No Bio"
                        : `${currentUser.bio}`}
                    </em> </h4>
            </Paper>
            <Paper className='window-name' style={{marginTop: "10px", width: "95%", borderRadius:"0.6rem", boxShadow: "none", height: "auto", paddingRight: "10px", paddingLeft: "10px", wordBreak: "break-word"}} >
            <Box className="postInfo">
                    <Box className="postText" sx={{ p: 1 }}>
                      <TextField
                        className="shareText"
                        placeholder="What's jibin'?"
                        sx={{ width: "100%" }}
                        InputProps={{ sx: { height: "auto" } }}
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
                        <Box className="previewClose" sx={{ p: 0.5 }}>
                          <CancelRoundedIcon
                            onClick={() => setImage(null)}
                            sx={{
                              cursor: "pointer",
                              justifyContent: "right",
                            }}
                          />
                        </Box>
                        <img src={image.image} />
                      </div>
                    </Box>
                  )}
                  <Divider />
                  <Box
                    className="sharebtn"
                    justifyItems={"center"}
                    sx={{ p: 0.5 }}
                  >
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
    
          <Grid className='post-corner' item xs={12} md={8.5} sx={{height: "auto"}}>
              <ProfilePostArea theme={theme} />
          </Grid>
        </Grid>
      </Paper>
    </div></div>
  )
}

export default ProfilePage;