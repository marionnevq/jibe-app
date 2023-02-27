import { Button, Divider, Grid, Paper } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import dp from '../images/nik.jpg'

const ProfileSide = ({ theme }) => {

//   const navigate = useNavigate();

//   const GoToProfile = async (event) => {
//     navigate("/profile/:username")
// }

  return (
    <div className='profileSide' style={{ minWidth: "100%", marginTop: "10px" }}>
    <Grid container sx={{display: "flex", justifyContent: "center", alignItems: "center"}} >
        
       <Grid item xs={12} sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
       <Paper className='profile' sx={{width: "90%", height: "270px", borderRadius:"0.6rem", boxShadow:"3"}}>
           <Grid item className='header' 
              sx={{width: "100%", height: "90px", backgroundColor: (() => theme === "dark" ? "#FFE5D9" : "black"), backgroundSize: "26%", backgroundAttachment:"fixed", paddingBottom: "15px", borderRadius:"0.6rem"}}/>
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
           <Divider className='divider'/>
           <div className='followerPart'>
             <Box className='followers' sx={{ width: "100%", p: 0.5, border: '1px dashed grey' }}>
               <span>802</span>
               <span>Followers</span>
             </Box>
             <Divider className='divider' orientation="vertical" variant="middle" flexItem />
             <Box className='following' sx={{ width: "100%", p: 0.5,  border: '1px dashed grey' }}>
               <span>521</span>
               <span>Following</span>
             </Box>
           </div>
        </Paper>
       </Grid>

        <Grid item xs={12} sx={{display: "flex", justifyContent: "center", alignItems: "center", marginTop:"10px"}}>
          <Grid container item className="latchBox" sx={{ width: "90%", height:"230px" }}>
            <Box className="latchTitle" sx={{ width: "100%", height:"40px", display: "flex", justifyContent: "left", alignItems: "center" }}>
              <span>Find more people</span>
            </Box>
            {/* <Divider className='divider'/> */}
            <Box className="latchList"  sx={{ width: "100%", height:"210px",  flexDirection:"column", p: 0.5 }}>
              <Box className="latchInfo" sx={{ width: "100%", height:"47px",  display: "flex" }}>
                <Box className="latchDp" sx={{ width: "20%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <img src={dp}/>
                </Box>
                <Box className="latchName" sx={{ width: "50%"  }}>
                  <span>Krishna Fagara</span>
                  <span>@kfagara</span>
                </Box>
                <Box className="latchBtn" sx={{ width: "30%"  }}>
                  <Button className='latchButton' sx={{ fontWeight:"bold", fontFamily: "montserrat" }}>Latch</Button>
                </Box>
              </Box>
              <Divider className='divider'/>

              <Box className="latchInfo" sx={{ width: "100%", height:"47px",  display: "flex" }}>
                <Box className="latchDp" sx={{ width: "20%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <img src={dp}/>
                </Box>
                <Box className="latchName" sx={{ width: "50%"  }}>
                  <span>Krishna Fagara</span>
                  <span>@kfagara</span>
                </Box>
                <Box className="latchBtn" sx={{ width: "30%"  }}>
                  <Button className='latchButton' sx={{ fontWeight:"bold", fontFamily: "montserrat" }}>Latch</Button>
                </Box>
              </Box>
              <Divider className='divider'/>
              <Box className="latchInfo" sx={{ width: "100%", height:"47px",  display: "flex" }}>
                <Box className="latchDp" sx={{ width: "20%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <img src={dp}/>
                </Box>
                <Box className="latchName" sx={{ width: "50%"  }}>
                  <span>Krishna Fagara</span>
                  <span>@kfagara</span>
                </Box>
                <Box className="latchBtn" sx={{ width: "30%"  }}>
                  <Button className='latchButton' sx={{ fontWeight:"bold", fontFamily: "montserrat" }}>Latch</Button>
                </Box>
              </Box>
              <Divider className='divider'/>
              <Box className="latchInfo" sx={{ width: "100%", height:"47px",  display: "flex" }}>
                <Box className="latchDp" sx={{ width: "20%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <img src={dp}/>
                </Box>
                <Box className="latchName" sx={{ width: "50%"  }}>
                  <span>Krishna Fagara</span>
                  <span>@kfagara</span>
                </Box>
                <Box className="latchBtn" sx={{ width: "30%"  }}>
                  <Button className='latchButton' sx={{ fontWeight:"bold", fontFamily: "montserrat" }}>Latch</Button>
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