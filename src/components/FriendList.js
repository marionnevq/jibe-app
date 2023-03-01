import React, { useEffect, useState } from 'react'
import { Avatar, Button, Divider, Grid, IconButton, Paper } from '@mui/material'
import { Box } from '@mui/system'
import alt from "../images/alternate.jpg"
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import "../style/LatchList.css";
import { useNavigate } from 'react-router-dom';
import * as userService from "../services/user";
import { async } from 'q';

const FriendList = ({ theme }) => {


  const [users, setUsers] = useState(null);
  const [currentUser, setCurrentUser] = useState(null)
  const navigate = useNavigate();

  //get follow list
  async function getFollowingList() {
    const currUser = await userService.getCurrentUser().then( async (response) => {
      setCurrentUser(response.data);
      console.log(response.data);
      await userService.getFollowList(response.data.username).then((response) => {
        setUsers(response.data);
        console.log(response.data);
      });
    });

  }
  useEffect(() => {
    getFollowingList();
  }, []);


  return (
    <div data-theme={theme}>
    <div style={{ minWidth: "100%", minHeight:"100vh" }} >
      <Box className="cover" id="header"/>
      <Grid container className='main-header'>
        <Grid  className='top-head' id='info-head' container item xs={12} md={3.5} sx={{display: "flex", justifyContent: "center", alignItems: "center"}} >
        <Avatar className='profile-img' src={alt} ></Avatar>
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
            {/* <Button variant='contained' className='latch-btn1'><PersonAddIcon sx={{marginRight: "10px"}}/> Latch</Button> */}
          </Grid>
          </div>
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
            {/* <Button className='btn-latch' variant='contained'><PersonAddIcon sx={{marginRight: "10px"}}/> Latch</Button> */}
          </Grid>
        </Grid></div>
      </Grid>
      {/*LatchList*/}
      <Grid item xs={12} className='bottom-foot' sx={{ minHeight: "100vh", display: "flex", justifyContent:"center" }}>
        <Paper className='list' sx={{ height: "auto", display: "flex", flexDirection:"column"  }}>
          <Box className="title" sx={{ margin:"3px", display: "flex", flexDirection: "column", width: "90%", borderRadius:"0.3rem" }}>
            <span><Divider className='dividerTitle'>Latch List</Divider></span>
          </Box>
            <Box className="latchBox" sx={{ margin:"5px", display: "flex", flexDirection: "column", width: "95%", borderRadius:"0.3rem"}}>
            {users && users.map((user) => (
                <Box className="nameList" sx={{ display:"flex", width:"100%", marginTop: "5px"  }} >
                  <Box className="latchInfoBox" sx={{ display:"flex", width:"100%", height:"100px" }}>
                      <Box classname="latchImg" sx={{ display:"flex", width:"25%", height:"100px",  alignItems:"center", justifyContent:"center" }}>
                          <img src={user.imageUrl}style={{ width:"4.5rem", borderRadius:"10%", height:"70%" }}/>
                      </Box>
                      <Box classname="latchInfo" sx={{ display:"flex", width:"60%", height:"100px", flexDirection:"column" , justifyContent:"center"}}>
                          <span style={{ fontWeight:"700" }}>{`${user.firstname} ${user.lastname}`}</span>
                          <span style={{ fontWeight:"400", fontSize:"13.5px" }}>@{`${user.username}`}</span>
                      </Box>
                      <Box classname="latchOption" sx={{ display:"flex", width:"15%", height:"100px"}}>
                          <IconButton>
                              <PersonRemoveIcon sx={{ fontSize:"30px" }}/>
                          </IconButton>
                      </Box>
                </Box>
            </Box>
            ))}
            </Box>
        </Paper>
      </Grid>
      </div>
    </div>
  )
}

export default FriendList