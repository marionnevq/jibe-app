import { Avatar, Button, Divider, Paper } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { Grid } from 'swiper'
import NavBar from '../components/NavBar'
import dp from '../images/nik.jpg'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import "../style/LatchList.css"

const LatchList = ({ onLogout, onSwitch, theme, currentUser }) => {
  return (
    <div className='latchList' style={{ minWidth: "100%" }}>
      <NavBar onLogout={onLogout} onSwitch={onSwitch} theme={theme} />
      <div style={{minHeight: "100vh"}} >
        <Box className="cover" id="header"/>
        
        <Grid container className='main-header'>
          <Grid  className='top-head' id='info-head' container item xs={12} md={3.5} sx={{display: "flex", justifyContent: "center", alignItems: "center"}} >
          <Avatar className='profile-img' src={dp} ></Avatar>
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
              <Button variant='contained' className='latch-btn1'><PersonAddIcon sx={{marginRight: "10px"}}/> Latch</Button>
            </Grid></div>
          </Grid>
          
          <div className='mobile' style={{display: "block"}}>
            <div className='name-info' >
                <h1>Jim Lloyd</h1>
                <h3>@jimlloyddg</h3>
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
                <Button className='btn-latch' variant='contained'><PersonAddIcon sx={{marginRight: "10px"}}/> Latch</Button>
              </Grid>
            </Grid>
            </div>
        </Grid>
     
      </div>

    </div>
  )
}

export default LatchList