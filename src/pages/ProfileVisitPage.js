import { Avatar, Button, Divider, Grid, Modal, Paper } from '@mui/material'
import { Box, display } from '@mui/system';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import alt from "../images/alternate.jpg"
import "../style/ProfileVisit.css"
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PostVisit from '../components/PostVisit';
import EditUser from '../components/EditUser';

const ProfileVisitPage = ({onLogout, onSwitch, theme, currentUser}) => {
  
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

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div style={{height: "auto"}}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
        sx={{overflow: "scroll"}}
      >
        <EditUser handleClose={handleClose}/>
      </Modal>
    <div data-theme={theme}>
      <NavBar onLogout={onLogout} onSwitch={onSwitch} theme={theme} />
    <div style={{minHeight: "100vh"}} >
      <Box className="cover" id="header"/>
      
      <Grid container className='main-header'>
        <Grid  className='top-head' id='info-head' container item xs={12} md={3.5} sx={{display: "flex", justifyContent: "center", alignItems: "center"}} >
        <Avatar className='profile-img' src={alt} ></Avatar>
        </Grid>
        
        <Grid className='bottom-head' id='info-head' container item xs={12} md={8.5} sx={{height: "auto"}}>
        <div className='web' >
          <Grid id='details' item xs={12} md={2.5} sx={{display: "block", textAlign: "center", lineHeight: "10px"}}>
            <h3 style={{fontSize: "21px", fontFamily: "montserrat", fontWeight: "500"}}>1298</h3>
            <h1 style={{fontSize: "15px", fontFamily: "montserrat"}}>Posts</h1>
          </Grid>
          <Grid id='details' item xs={12} md={2.5} sx={{display: "block", textAlign: "center", lineHeight: "10px"}}>
            <h3 style={{fontSize: "21px", fontFamily: "montserrat", fontWeight: "500"}}>5.6m</h3>
            <h1 style={{fontSize: "15px", fontFamily: "montserrat"}}>Followers</h1>
          </Grid>
          <Grid id='details' item xs={12} md={2.5} sx={{display: "block", textAlign: "center", lineHeight: "10px"}}>
            <h3 style={{fontSize: "21px", fontFamily: "montserrat", fontWeight: "500"}}>3</h3>
            <h1 style={{fontSize: "15px", fontFamily: "montserrat"}}>Following</h1>
          </Grid>
          <Grid id='button-follow'item xs={12} md={3} sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Button variant='contained' className='latch-btn1' onClick={handleOpen}><PersonAddIcon sx={{marginRight: "10px"}}/> Latch</Button>
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
        </Grid></div>
      </Grid>
      <Paper className='bottom-foot'>
        <Grid container className= 'foot' style= {{height: "auto"}}>
          <Grid className='left' item xs={12} md={3.5} sx={{display: "flex", justifyContent: "center", alignItems: "start", marginTop: "10px"}}>
            <Paper className='window-name' style={{width: "95%", borderRadius:"0.6rem", boxShadow: "none", height: "auto", paddingRight: "10px", paddingLeft: "10px", wordBreak: "break-word"}} >
                <h1>Jim Lloyd</h1>
                <h3>@jimlloyddg</h3>
                <Divider className='divider-info' />
                <h4>No one can ever be word word word  word word word  word word word </h4>
            </Paper>
          </Grid>
          <Grid className='post-corner' item xs={12} md={8.5} sx={{height: "auto"}}>
              <PostVisit theme={theme} />
          </Grid>
        </Grid>
      </Paper>
    {/* <Grid container sx={{height: "auto"}}>
        <Grid container item xs={12} md={12} sx={{height: "100px"}}>
          Hello
        </Grid>
        <Grid container item xs={12} md={12} sx={{backgroundColor: "black", height: "auto"}}></Grid>
        <Grid container item xs={12} md={4} sx={{backgroundColor: "pink", height: "auto"}}></Grid>
        <Grid container item xs={12} md={8} sx={{backgroundColor: "yellow", height: "auto"}}></Grid>
    </Grid> */}
    </div></div></div>
  )
}

export default ProfileVisitPage