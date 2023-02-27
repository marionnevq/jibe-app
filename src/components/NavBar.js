import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Avatar, Grid, Menu, MenuItem, Paper, Switch, TextField} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PeopleIcon from '@mui/icons-material/People';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import SearchIcon from '@mui/icons-material/Search';
import Divider from '@mui/material/Divider';
import nav from "../images/nav.png"
import nav1 from "../images/nav1.png"
import nav2 from "../images/nav2.png"
import nav3 from "../images/nav3.png"
import nik from "../images/nik.jpg"
import "../style/NavBar.css";
import { Link, useNavigate } from 'react-router-dom';
import { color } from '@mui/system';

const NavBar = ({onLogout, onSwitch, theme}) => {
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [search, setSearch] = useState({
    username : ""
  });
  const [click, setClick] = useState("unclicked");
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handlePathToProfile = () => {
    // navigate("/profile/:username")
    console.log("profile")
  }

  const handleChange = ({ currentTarget: input }) => {
    setSearch({
        ...search,
        [input.name]: input.value,
    });
    console.log(input.value);
  }

  const themeNow = theme;

  return (
    <Grid className='nav-bar' container style={{minHeight : "auto"}}>
      <Grid className= "logo" item xs={12} md={1}>
      {
          themeNow === "light" ? 
          <img src={nav} style={{width: "80%"}} /> :
          <img src={nav1} style={{width: "80%"}} />
      } 
      </Grid>
      <Grid container item xs={12} md={11} style={{height: "60px"}}>
        <div className='left'>
        {
          themeNow === "light" ? 
          <img className='nav-two' src={nav3}  />:
          <img className='nav-two' src={nav2}  />
      } 
        
        <Paper
      component="form"
      className="search"
      sx={{backgroundColor: (() => theme === "light" ? "white" : "#333333")}}
    >
      <IconButton type="button" sx={{ p: '10px',color: (() => theme === "light" ? "#1C2835" : "#f2f2f2") }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Divider className='divider' x={{ height: 28, m: 0.5 }} orientation="vertical" />
      <input
      onChange={handleChange}
        name='username'
        autoComplete='off'
        value={search.username}
        sx={{ ml: 1, flex: 1 }}
        placeholder=" Search"
        IconButton = {<SearchIcon/>}
        className="click" id='search'
        type="search"
        style={{border: "none", outlineColor: (() => theme === "light" ? "#f2f2f2" : "#333333")}}
      />
    </Paper>
        </div>
        <div className='right' >
        <Switch 
            defaultChecked={
              theme === "light"? false : true
            } 
            onChange={onSwitch}
            color="tertiary"
            className="switch"
            sx={{marginRight: "40px"}}
          />
          <IconButton
            className='icon1'
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{borderRadius: 1}}
          >
            <NotificationsIcon/>
          </IconButton>
          <IconButton
            className='icon2'
            id='menu'
            size="large"
            edge="start"
            aria-label="open drawer"
            sx={{ marginLeft: "2px", color: (() => theme === "light" ? "#1C2835" : "#f2f2f2")}}
            onClick={handleOpenMenu}  
          >
            <MenuIcon className='icons'/> 
          </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseMenu}
          sx={{width:"500px", paddingTop: "-30px"}}
        >
          <Paper className='menu-paper' sx={{backgroundColor: (() => theme === "light" ? "#f2f2f2" : "#272727"),  height: "auto"}}>
         <MenuItem className='menuItem' onClick={handlePathToProfile} sx={{fontFamily: "montserrat", backgroundColor: (() => theme === "light" ? "#f2f2f2" : "#333333"), color: (() => theme === "light" ? "#333333" : "#f2f2f2"), marginTop: "-6px", marginBottom: ".5px", borderBottom: "2px"}}>
            <AccountCircleIcon />&nbsp;&nbsp;Profile
          </MenuItem>
          <MenuItem className='menuItem' sx={{fontFamily: "montserrat", backgroundColor: (() => theme === "light" ? "#f2f2f2" : "#333333"), color: (() => theme === "light" ? "#333333" : "#f2f2f2"), marginBottom: ".5px"}}>
            <PeopleIcon/>&nbsp; Latch list
          </MenuItem>
          <MenuItem className='menuItem' sx={{fontFamily: "montserrat", backgroundColor: (() => theme === "light" ? "#f2f2f2" : "#333333"), color: (() => theme === "light" ? "#333333" : "#f2f2f2"), marginBottom: "-6px"}} onClick={onLogout}>
            <MeetingRoomIcon />&nbsp;&nbsp;Logout
          </MenuItem>
          </Paper>
        </Menu>
        </div>
      </Grid>
    </Grid>
  );
}
export default NavBar