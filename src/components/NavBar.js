// import React from "react";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import {Grid, Toolbar} from "@mui/material";
// import {Typography} from "@mui/material";
// import Button from "@mui/material/Button";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import logo from "../images/logo-noblack-label.png"
// import { Link, useNavigate } from "react-router-dom";
// import Paper from '@mui/material/Paper';
// import nav from "../images/nav.png"

// const NavBar = ({ onLogout }) => {
//   const navigate = useNavigate();
//   return (
//     // <Box sx={{ flexGrow: 1 }}>
//     //   <AppBar position="static" sx={{backgroundColor: "#EEE8DB"}}>
//     //     <Toolbar>
//     //     <Button
//     //       variant="text"
//     //       LinkComponent={Link}
//     //       to="/feed"
//     //       sx={{ fontSize: 35, fontFamily: "montserrat", color: "#1A212E", width: "15%", display: "flex", justifyContent: "center"}}
//     //     >
//     //       J I B E<img src={logo} style={{width: "17%", height: "17%", marginRight: 0}} />
//     //     </Button>
//     //       <div>
           
//     //       <Paper
//     //   component="form"
//     //   sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300, height: 30 }}
//     // >
//     //   <InputBase
//     //     sx={{ ml: 1, flex: 1 }}
//     //     placeholder="Search"
//     //     inputProps={{ 'aria-label': 'search google maps' }}
//     //   />
//     //   <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
//     //   <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
//     //     <SearchIcon />
//     //   </IconButton>
//     // </Paper>
            
//     //       </div>
//     //     </Toolbar>
//     //   </AppBar>
//     // </Box>
//     <AppBar position="static" sx={{backgroundColor: "#EEE8DB", height: "60px"}}>
//     <Grid container sx={{marginTop:2}}>

//       <Grid container item xs={3}>
//       <Box
//       component="form"
//       sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300, height: 30, marginTop: 1}}
//     >
//       <img src={nav} style={{width: "70%", height: "auto", marginTop: 3 }} />
//     </Box>
      
//       </Grid>
//       <Grid item xs={5}>
//       <div>
//       <Paper
//       component="form"
//       sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300, height: 30, marginTop: 1 }}
//     >
//       <InputBase
//         sx={{ ml: 1, flex: 1 }}
//         placeholder="Search"
//         inputProps={{ 'aria-label': 'search google maps' }}
//       />
//       <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
//       <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
//         <SearchIcon />
//       </IconButton>
//     </Paper>
//     </div>
//       </Grid>
//        <Grid item xs={2}>4</Grid>
//        <Grid item xs={2}>4</Grid>
//     </Grid>
//     </AppBar>
//   );
// };

// export default NavBar;
import nik from "../images/nik.jpg"
import "./NavBar.css";
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import nav from "../images/nav.png"
import NotificationsIcon from '@mui/icons-material/Notifications';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Avatar, Grid, Menu, MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PeopleIcon from '@mui/icons-material/People';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
function NavBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 30,
  marginRight: 40,
  backgroundColor: "#faf6ec",
  '&:hover': {
    backgroundColor: "white",
    
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width', "borderRadius"),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '0ch',
      borderRadius: 5,
      '&:focus': {
        width: '30ch',
        borderRadius: 0,
      },
    },
  },
}));
const handleOpenMenu = (event) => {
  setAnchorEl(event.currentTarget);
};
const open = Boolean(anchorEl);
const handleCloseMenu = () => {
  setAnchorEl(null);
};


  return (
    <Grid container sx={{ flexGrow: 1}}>
      <AppBar position="static" sx={{backgroundColor:"#EEE8DB"}}>
      <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            <img src={nav} style={{width: "15%", marginTop:10}} />
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            /></Search>
            <div className='btn-nav' style={{justifyContent:"end"}}>
              <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2, margin: "20, 20", borderRadius: 1 , color: "#1A212E" }}
          >
            <AddCircleOutlineIcon className='addIcon' />
          </IconButton>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2, margin: "20, 20", borderRadius: 1, color: "#1A212E" }}
            
          >
            <NotificationsIcon id='notifIcon'/>
          </IconButton>
          <IconButton>
          <Avatar src={nik} sx={{width: 50, height:50, margin: "0, 5"}}/>
          </IconButton>
          
          </div>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2, marginLeft: 3, borderRadius: 1, color: "#1A212E" }}
            onClick={handleOpenMenu}
            
          >
            <MenuIcon />
           
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseMenu}
            sx={{width:"500px"}}
          >
            <MenuItem sx={{borderBottom: .05, borderColor: "#dedad1", fontFamily: "montserrat"}}>
              <AccountCircleIcon />&nbsp;&nbsp;Profile
            </MenuItem>
            <MenuItem sx={{borderBottom: .05, borderColor: "#dedad1", fontFamily: "montserrat"}}>
              <PeopleIcon/>&nbsp; Latch list
            </MenuItem>
            <MenuItem sx={{fontFamily: "montserrat"}}>
              <MeetingRoomIcon />&nbsp;&nbsp;Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Grid>
  );
}export default NavBar