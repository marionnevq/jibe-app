import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Grid, Menu, MenuItem, Paper, Switch } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PeopleIcon from '@mui/icons-material/People';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import SearchIcon from '@mui/icons-material/Search';
import Divider from '@mui/material/Divider';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import nav from "../images/nav.png"
import nav1 from "../images/nav1.png"
import nav2 from "../images/nav2.png"
import nav3 from "../images/nav3.png"
import "../style/NavBar.css";
import { useNavigate } from 'react-router-dom';
import { getUser } from "../services/auth";

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

  const GoToProfile = async (currentUser) => {
    navigate(`/profile/${currentUser.username}`)
  }

  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const current = await getUser();
    setCurrentUser(current.data);    
  };

  // const handleSearchProfiles = () => {
  //   employeeService
  //     .updateEmployee(employee.id, form)
  //     .then(() => {
  //       navigate("/");
  //     })
  //     .catch((error) => {
  //       if (error.response && error.response.status === 400) {
  //         alert(error.response.data.message[0]);
  //       }
  //     });
  // }

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
      <IconButton 
        type="button" 
        sx={{ p: '10px',color: (() => theme === "light" ? "#1C2835" : "#f2f2f2") }} 
        aria-label="search"
        // onClick={}
      >
        <SearchIcon />
      </IconButton>
      <Divider className='divider' orientation="vertical" />
      <input
      onChange={handleChange}
        name='username'
        autoComplete='off'
        value={search.username}
        placeholder="Search"
        className="click" id='search'
        type="search"
        style={{border: "none", outlineColor: (() => theme === "light" ? "#f2f2f2" : "#333333")}}
      />
    </Paper>
        </div>
        <div className='right' >
          {
            theme === "light" ? <LightModeIcon className='mode' sx={{fontSize: "20px"}}/> : <DarkModeIcon className='mode' sx={{fontSize: "20px"}}/>
          }
        <Switch 
            defaultChecked={
              theme === "light"? false : true
            } 
            onChange={onSwitch}
            color="tertiary"
            className="switch"
            sx={{marginRight: "30px"}}
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
         <MenuItem className='menuItem'  sx={{fontFamily: "montserrat", backgroundColor: (() => theme === "light" ? "#f2f2f2" : "#333333"), color: (() => theme === "light" ? "#333333" : "#f2f2f2"), marginTop: "-6px", marginBottom: ".5px", borderBottom: "2px"}} onClick={() => (GoToProfile(currentUser))}>
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
};
export default NavBar;
