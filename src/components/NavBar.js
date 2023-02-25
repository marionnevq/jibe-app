import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Avatar, Grid, Menu, MenuItem, Paper, Switch} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PeopleIcon from '@mui/icons-material/People';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import nav from "../images/nav.png"
import nav1 from "../images/nav1.png"
import nik from "../images/nik.jpg"
import "../style/NavBar.css";
import { Link, useNavigate } from 'react-router-dom';
import { color } from '@mui/system';

const NavBar = ({onLogout, onSwitch, theme}) => {
  
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
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '0ch',
        '&:focus': {
          width: '30ch',
        },
      },
    },
  }));

  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handlePathToProfile = () => {
    navigate("/profile/:username")
  }

  const themeNow = theme;

  return (
   <Paper data-theme={theme} className="parent">
    <Grid container sx={{ flexGrow: 1}}>
      <AppBar position="static" >
      <Toolbar className='nav-bar'>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
        >
         {
          themeNow === "light" ? 
          <img src={nav} style={{width: "10%", marginTop:10}} /> :
          <img src={nav1} style={{width: "10%", marginTop:10}} />
         } 
          
        </Typography>
        <Search sx={{color: "#2c3568"}}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
        <div className='btn-nav' style={{justifyContent:"end"}}>
          <IconButton
            className='icons'
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2, margin: "20, 20", borderRadius: 1}}
          >
            <NotificationsIcon/>
          </IconButton>
          <Switch 
            defaultChecked={
              theme === "light"? false : true
            } 
            onChange={onSwitch}
            color="tertiary"
            className="switch"
            sx={{marginTop: "6px"}}
          />
        </div>
          <IconButton
            className='icons'
            id='menu'
            size="large"
            edge="start"
            aria-label="open drawer"
            sx={{ marginLeft: 2, borderRadius: 1, color: (() => theme === "light" ? "#1C2835" : "#f2f2f2")}}
            onClick={handleOpenMenu}  
          >
            <MenuIcon className='icons'/> 
          </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseMenu}
          sx={{width:"500px"}}
        >
          <MenuItem className='menu' onClick={handlePathToProfile} sx={{fontFamily: "montserrat"}}>
            <AccountCircleIcon />&nbsp;&nbsp;Profile
          </MenuItem>
          <MenuItem className='menu' sx={{fontFamily: "montserrat"}}>
            <PeopleIcon/>&nbsp; Latch list
          </MenuItem>
          <MenuItem sx={{fontFamily: "montserrat"}} onClick={onLogout}>
            <MeetingRoomIcon />&nbsp;&nbsp;Logout
          </MenuItem>
          <MenuItem sx={{fontFamily: "montserrat", backgroundColor: "#f2f2f2"}}>
          <Switch 
            defaultChecked={
              theme === "light"? false : true
            } 
            onChange={onSwitch}
            color="tertiary"
            className="switch"
            sx={{marginTop: "6px", marginLeft: 0}}
          />Brightness
          </MenuItem>
        </Menu>
      </Toolbar>
      </AppBar>
    </Grid>
    </Paper> 
  );
}
export default NavBar