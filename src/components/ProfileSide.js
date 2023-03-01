import { Button, Divider, Grid, IconButton, Paper } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { getCurrentUser } from '../services/user'
import dp from '../images/nik.jpg'
import alternate from "../images/alternate.jpg";
import * as userService from "../services/user";

import PersonAddIcon from '@mui/icons-material/PersonAdd';

const ProfileSide = ({ theme }) => {

  const [users, setUsers] = useState(null);
  const [currentUser, setCurrentUser] = useState(null)
  const navigate = useNavigate();


    useEffect(() => {
        loadUser();
    },[])

    const GoToProfile = async (user) => {
      console.log(user);
      const username = user.username;
      navigate(`/profile/visit/${username}`)
    }

    const loadUser = async() => {
        const current = await getCurrentUser();
        setCurrentUser(current.data);
    }

  return (
    <div className='profileSide' style={{ minWidth: "100%", marginTop: "10px" }} data-theme={theme}>
    <Grid container sx={{display: "flex", justifyContent: "center", alignItems: "center"}} >
        
       <Grid item xs={12} sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
       <Paper className='profile' sx={{width: "90%", height: "270px", borderRadius:"0.6rem", boxShadow:"1"}}>
           <Grid item className='header' 
              sx={{width: "100%", height: "90px", paddingBottom: "15px", borderRadius:"0.6rem"}}/>
           <Grid item className='profileDp' sx={{ width: "100%", marginTop:"-50px", justifyContent:"center", display: "flex" }}>
              <img src={currentUser === null ? " " : `${currentUser.imageUrl}`} alt="" onClick={GoToProfile}/>
          </Grid>
           <Box className="names" sx={{ marginTop:"10px" }}>
             <Box className="name">

               <span onClick={GoToProfile}>{currentUser === null ? " " : `${currentUser.firstname} ${currentUser.lastname}` }</span>
             </Box>
             <Box className="username">
              <span>@{currentUser === null ? " " : `${currentUser.username}` }</span>

             </Box>
           </Box>
           <Divider className='divider'/>
           <Grid item className='followerPart'>
             <Box className='followers' sx={{ width: "100%", p: 0.5 }}>
               <span>802</span>
               <span>Followers</span>
             </Box>
             <Divider className='divider' orientation="vertical" variant="middle" flexItem />
             <Box className='following' sx={{ width: "100%", p: 0.5  }}>
               <span>521</span>
               <span>Following</span>
             </Box>
           </Grid>
        </Paper>
       </Grid>
    </Grid>
    </div>
  )
}

export default ProfileSide