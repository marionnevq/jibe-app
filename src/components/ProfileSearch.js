import { Avatar, Box, Grid, IconButton, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { searchUsers } from '../services/auth';
import CloseIcon from '@mui/icons-material/Close';
import "../style/NavBar.css"
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import spinner from "../images/loading1.gif"

const ProfileSearch = ({handleClose, search, theme}) => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    useEffect(() => {
        loadPost();
    }, [])

    const loadPost = async() => {
        console.log(search);
        await searchUsers(search).then((response) => {
            console.log(response.data);
            setUsers(response.data);
        })
    }

    const handleGoToProfile = (username) => {
        setLoading(true);
        const timer = setTimeout(() => {
            handleClose();
            navigate(`/profile/visit/${username}`);
            setLoading(false);
            window.location.reload(false);
            
          }, 1000);
       
    }

    if(loading){
        return <div style={{
          width: "100%", 
          height: "100vh",
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center"}}>
                  <img src={spinner} style={{width: "5%"}}></img>
                </div>
    }

    console.log(users);

  return (
  <Paper
  className='search-paper'
  sx={{ backgroundColor: () => (theme === "light" ? "white" : "#333333"), height: "400px" , display: "block", width: "500px", paddingBottom: "30px", borderBottom: "1px solid gray" }}
  data-theme={theme}>
    <Grid className='search-head' container sx={{display: "flex", justifyContent: "end", backgroundColor: (() => theme === "light" ? "white" : "#333333")}}>
          
          <IconButton className="close-modal" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
          </Grid>
           <div id='title' >
          <h2 id="child-modal-title">Search Result</h2>
          </div>
  {users.map((user) => 
    <Grid container item
    sx={{
      backgroundColor: () => (theme === "light" ? "white" : "#333333"), borderBottom: "2px soli white", marginBottom: "10px", fontFamily: "montserrat"
    }}
  >
    <Box className="info" sx={{ p: 0.2, marginLeft: "25px"}}>
      <Box className="opImg" sx={{ p: 1  }}>
        <div className="opInfo">
          <Avatar
            src={user === null? "" : user.imageUrl}
            alt=""
            sx={{width: "50px", height: "50px"}} />
        </div>
      </Box>
      <Box
        className="opName"
        onClick={() => handleGoToProfile(user.username)}
        sx={{
          p: 1,
          color: () => (theme === "light" ? "#333333" : "white"),
          width: "100%",
          marginLeft: "15px"
        }}
      >
        <Box className="name-link" sx={{width: "100%", fontSize: "15px", fontWeight: "600"}}>
            {user === null
              ? ""
              : `${user.firstname} ${user.lastname}`}
        </Box>
        <Box className= "uName-link"sx={{width: "100%", fontSize: "12px"}}>
           {user.username}
        </Box>
      </Box>
    </Box>
  </Grid>)}
  </Paper>
  )
}

export default ProfileSearch