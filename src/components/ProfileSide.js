import { Divider, Grid, Paper } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import dp from '../images/nik.jpg'

const ProfileSide = ({ theme }) => {

//   const navigate = useNavigate();

//   const GoToProfile = async (event) => {
//     navigate("/profile/:username")
// }

  return (
    <div className='profileSide' style={{ minWidth: "100%", marginTop: "10px"}}>
    <Grid container sx={{display: "flex", justifyContent: "center", alignItems: "center"}} >
        
        <Paper className='profile' sx={{width: "90%", height: "300px", paddingBottom: "10px", borderRadius:"0.6rem", boxShadow:"2"}}>
           <Grid item className='header' 
              sx={{width: "100%", height: "90px", backgroundColor: "#FFE5D9", backgroundSize: "26%", backgroundAttachment:"fixed", paddingBottom: "15px", borderRadius:"0.6rem"}}/>
           <Grid item className='profileDp' sx={{ width: "100%", marginTop:"-50px", justifyContent:"center", display: "flex" }}>
              <img src={dp} alt=""/>
          </Grid>
           <Box className="names" sx={{ marginTop:"10px" }}>
             <Box className="name">
               <span>Nikki Fagara</span>
             </Box>
             <Box className="username">
             <span>@nikkifagara</span>
             </Box>
           </Box>
           <Divider variant="fullWidth" />
           <div className='followerPart'>
             <Box className='followers' sx={{ width: "100%", p: 2.5 }}>
               <span>802</span>
               <span>Followers</span>
             </Box>
             <Box className='following' sx={{ width: "100%", p: 2.5 }}>
               <span>521</span>
               <span>Following</span>
             </Box>
           </div>
        </Paper>

        <Paper className='latchList' sx={{width: "90%", height: "200px", paddingBottom: "10px", borderRadius:"0.6rem", boxShadow:"2", marginTop:"7px" }}>

        </Paper>
    </Grid>
    </div>
  )
}

export default ProfileSide