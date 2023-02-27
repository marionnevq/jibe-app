import { Avatar, Button, Grid, Paper } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import alt from "../images/alternate.jpg"

const ProfileVisitPage = () => {
  
  const params = useParams();

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  //   fetchUserByUsername(params.username).then((response) => {
  //     setUser(response.data);
  //     setLoading(false);
  //   });
  // }, [params.id]);

  const handleSubmit = (form) => {
    // employeeService
    //   .updateEmployee(employee.id, form)
    //   .then(() => {
    //     navigate("/");
    //   })
    //   .catch((error) => {
    //     if (error.response && error.response.status === 400) {
    //       alert(error.response.data.message[0]);
    //     }
    //   });
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div style={{minHeight: "100vh"}}>
      <Paper sx={{height: "200px", backgroundColor: "black"}} />
      <Grid container sx={{height: "150px", display: "flex"}}>
        <Grid container item xs={12} md={3.5} sx={{backgroundColor: "pink", height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}} >
        <Avatar src={alt} sx={{width: "200px", height: "auto", marginTop: "-25px"}}></Avatar>
        </Grid>
        <Grid container item xs={12} md={8.5} sx={{backgroundColor: "green", height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
          <Grid item xs={12} md={3} sx={{display: "block", textAlign: "center", lineHeight: "15px"}}>
            <h3>1298</h3>
            <h1>Posts</h1>
          </Grid>
          <Grid item xs={12} md={3} sx={{display: "block",  textAlign: "center", lineHeight: "15px"}}>
            <h3>5.6m</h3>
            <h1>Followers</h1>
          </Grid>
          <Grid item xs={12} md={3} sx={{display: "block",  textAlign: "center", lineHeight: "15px"}}>
            <h3>3</h3>
            <h1>Following</h1>
          </Grid>
          <Grid item xs={12} md={3} sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Button>Latch</Button>
          </Grid>
        </Grid>
      </Grid>
      <Paper sx={{height: "100vh", backgroundColor: "black"}} />
    {/* <Grid container sx={{height: "auto"}}>
        <Grid container item xs={12} md={12} sx={{height: "100px"}}>
          Hello
        </Grid>
        <Grid container item xs={12} md={12} sx={{backgroundColor: "black", height: "auto"}}></Grid>
        <Grid container item xs={12} md={4} sx={{backgroundColor: "pink", height: "auto"}}></Grid>
        <Grid container item xs={12} md={8} sx={{backgroundColor: "yellow", height: "auto"}}></Grid>
    </Grid> */}
    </div>
  )
}

export default ProfileVisitPage