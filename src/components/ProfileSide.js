import { Grid, Paper } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { getUser } from '../services/auth';
import "../style/Feed.css"

const ProfileSide = () => {

    const [currentUser, setCurrentUser] = useState(null)
    
    
    useEffect(() => {
        loadUser();
    },[])

    const loadUser = async() => {
        const current = await getUser();
        setCurrentUser(current.data);
        console.log(current.data.firstTimeLogin);
        // console.log(current);
    } 

return(  
    <div style={{ minWidth: "100%", marginTop: "12px"}}>
    <Grid container sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
        <Paper className='pro-paper' sx={{width: "95%", height: "auto"}}>
            {currentUser && currentUser.firstname
            }
        </Paper>
    </Grid>
    </div>
  )
}

export default ProfileSide