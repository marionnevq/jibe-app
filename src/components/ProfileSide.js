import { Button, Divider, Grid, IconButton, Paper } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { getCurrentUser } from '../services/user'
import dp from '../images/nik.jpg'

import PersonAddIcon from '@mui/icons-material/PersonAdd';

const ProfileSide = ({ theme }) => {

  const [currentUser, setCurrentUser] = useState(null)
  const navigate = useNavigate();


    useEffect(() => {
        loadUser();
    },[])

    const navigate = useNavigate();
    const GoToProfile = async (event) => {
    navigate("/profile/:username")
    }

    const loadUser = async() => {
        const current = await getCurrentUser();
        setCurrentUser(current.data);
        console.log(current.data);
    }

    useEffect(() => {
        loadUser();
    },[])

    const loadUser = async() => {
        const current = await getCurrentUser();
        setCurrentUser(current.data);
        console.log(currentUser);
    }

  return (
    <div className='profileSide' style={{ minWidth: "100%", marginTop: "10px" }} data-theme={theme}>
    <Grid container sx={{display: "flex", justifyContent: "center", alignItems: "center"}} >
        
       <Grid item xs={12} sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
       <Paper className='profile' sx={{width: "90%", height: "270px", borderRadius:"0.6rem", boxShadow:"1"}}>
           <Grid item className='header' 
              sx={{width: "100%", height: "90px", backgroundSize: "26%", backgroundAttachment:"fixed", paddingBottom: "15px", borderRadius:"0.6rem"}}/>
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

        <Grid item xs={12} sx={{display: "flex", justifyContent: "center", alignItems: "center", marginTop:"10px"}}>
          <Grid container item className="latchBox" sx={{ width: "90%", height:"230px" }}>
            <Box className="latchTitle" sx={{ width: "100%", height:"40px", display: "flex", justifyContent: "left", alignItems: "center" }}>
              <span>Find more people</span>
            </Box>
            {/* <Divider className='divider'/> */}
            <Box className="latchList"  sx={{ width: "100%", height:"200px",  flexDirection:"column", p: 0.5,  borderRadius:"0.6rem" }}>
              <Box className="latchInfo" sx={{ width: "100%", height:"47px",  display: "flex" }}>
                <Box className="latchDp" sx={{ width: "20%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <img src={dp}/>
                </Box>
                <Box className="latchName" sx={{ width: "60%"  }}>
                  <span>Krishna Fagara</span>
                  <span>@kfagara</span>
                </Box>
                <Box className="latchBtn" sx={{ width: "20%"  }}>
                  <IconButton className='buttonLatch'>
                    <PersonAddIcon sx={{ color: "#EB4660" }}/>
                  </IconButton>
                </Box>
              </Box>
              <Divider className='divider'/>

              <Box className="latchInfo" sx={{ width: "100%", height:"47px",  display: "flex" }}>
                <Box className="latchDp" sx={{ width: "20%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <img src={dp}/>
                </Box>
                <Box className="latchName" sx={{ width: "60%"  }}>
                  <span>Krishna Fagara</span>
                  <span>@kfagara</span>
                </Box>
                <Box className="latchBtn" sx={{ width: "20%"  }}>
                  <IconButton className='buttonLatch'>
                    <PersonAddIcon sx={{ color: "#EB4660" }}/>
                  </IconButton>
                </Box>
              </Box>
              <Divider className='divider'/>
              <Box className="latchInfo" sx={{ width: "100%", height:"47px",  display: "flex" }}>
                <Box className="latchDp" sx={{ width: "20%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <img src={dp}/>
                </Box>
                <Box className="latchName" sx={{ width: "60%"  }}>
                  <span>Krishna Fagara</span>
                  <span>@kfagara</span>
                </Box>
                <Box className="latchBtn" sx={{ width: "20%"  }}>
                  <IconButton className='buttonLatch'>
                    <PersonAddIcon sx={{ color: "#EB4660" }}/>
                  </IconButton>
                </Box>
              </Box>
              <Divider className='divider'/>
              <Box className="latchInfo" sx={{ width: "100%", height:"47px",  display: "flex" }}>
                <Box className="latchDp" sx={{ width: "20%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <img src={dp}/>
                </Box>
                <Box className="latchName" sx={{ width: "60%"  }}>
                  <span>Krishna Fagara</span>
                  <span>@kfagara</span>
                </Box>
                <Box className="latchBtn" sx={{ width: "20%"  }}>
                  <IconButton className='buttonLatch'>
                    <PersonAddIcon sx={{ color: "#EB4660" }}/>
                  </IconButton>
                </Box>
              </Box>
              
            </Box>
          </Grid>
        </Grid>
    </Grid>
    </div>
  )
}

export default ProfileSide