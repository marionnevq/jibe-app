import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloseIcon from "@mui/icons-material/Close";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import HomeIcon from "@mui/icons-material/Home";
import LightModeIcon from "@mui/icons-material/LightMode";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PeopleIcon from "@mui/icons-material/People";
import PriorityHighOutlinedIcon from "@mui/icons-material/PriorityHighOutlined";
import SearchIcon from "@mui/icons-material/Search";
import {
  Badge,
  Grid,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Modal,
  Paper,
  Switch,
  Typography
} from "@mui/material";
import Divider from "@mui/material/Divider";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import nav from "../images/nav.png";
import nav1 from "../images/nav1.png";
import nav2 from "../images/nav2.png";
import nav3 from "../images/nav3.png";
import { getUser } from "../services/auth";
import { deleteNotification, getNotifications } from "../services/notification";

import { useState } from "react";
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';
import { Box } from "@mui/system";
import Joi from "joi";


const NavBar = ({ onLogout, onSwitch, theme }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElNotif, setAnchorElNotif] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [search, setSearch] = useState({
    username: "",
  });
  const [click, setClick] = useState("unclicked");
  const open = Boolean(anchorEl);
  const [errors, setErrors] = useState({});
  const openNotif = Boolean(anchorElNotif);
  const navigate = useNavigate();
  const [opened, setOpen] = React.useState(false);
  const show = Boolean(opened);
  const schema = Joi.object({
    username: Joi.string()
    .min(1)
    .required()
});

  const isFormInvalid = () => {
    const result = schema.validate(search);
    return !!result.error;
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleCloseNotifs = () => {
    setAnchorElNotif(null);
  };

  const GoToProfile = async (currentUser) => {
    navigate(`/profile/${currentUser.username}`);
  };

  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const current = await getUser();
    setCurrentUser(current.data);
    const notifs = await getNotifications();
    setNotifications(notifs.data);
  };


  const goToLatchlist = (event) => {
    event.preventDefault();
    navigate('/profile/latch-list');
  };
  const handleChange = ({ currentTarget: input }) => {
    setSearch({
      ...search,
      [input.name]: input.value,
    });
    console.log(input.value);

    const { error } = schema
      .extract(input.name)
      .label(input.name)
      .validate(input.value);

    if (error) {
      setErrors({ ...errors, [input.name]: "Field required" });
    } else if (error) {
        setErrors({ ...errors, [input.name]: error.details[0].message });
    }else {
        delete errors[input.name];
        setErrors(errors);
    }
  };

  const handleClearNotifications = async() => {
    notifications.forEach(async (notification) => {
      await deleteNotification(notification.id);
    });
  };

  const themeNow = theme;
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    marginLeft: "35px",
    pt: 1,
    pl: 1,
    pr: 1,
  };

  return (
    <div style={{position: "sticky"}}>
       <Modal
        open={show}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <div style={{height: "100vh", display:"flex", justifyContent: "center", alignItems: "center"}}>
        <ProfileSearch handleClose={handleClose} search={search.username} theme={theme}/>
        </div>
      </Modal>
    
    <Grid className="nav-bar" container style={{ minHeight: "auto" }}>
      <Grid className="logo" item xs={12} md={1}>
        {themeNow === "light" ? (
          <img
            src={nav}
            style={{ width: "80%", cursor: "pointer"  }}
            onClick={() => navigate("/feed")}
          />
        ) : (
          <img
            src={nav1}
            style={{ width: "80%", cursor: "pointer"  }}
            onClick={() => navigate("/feed")}
          />
        )}
      </Grid>
      <Grid container item xs={12} md={11} style={{ height: "60px" }}>
        <div className="left">
          {themeNow === "light" ? (
            <img
              className="nav-two"
              src={nav3}
              onClick={() => navigate("/feed")}
            />
          ) : (
            <img
              className="nav-two"
              src={nav2}
              onClick={() => navigate("/feed")}
            />
          )}

          <Paper
            component="form"
            className="search"
            sx={{
              backgroundColor: () => (theme === "light" ? "white" : "#333333"),
            }}
          >
            <IconButton
              type="button"
              sx={{
                p: "10px",
                color: () => (theme === "light" ? "#1C2835" : "#f2f2f2"),
              }}
              aria-label="search"
              onClick={handleOpen}
              disabled={isFormInvalid()}
            >
              <SearchIcon />
            </IconButton>
            <Divider className="divider" orientation="vertical" />
            <input
              onChange={handleChange}
              name="username"
              autoComplete="off"
              value={search.username}
              placeholder="Search"
              className="click"
              id="search"
              type="search"
              style={{
                border: "none",
                outlineColor: () => (theme === "light" ? "#f2f2f2" : "#333333"),
              }}
            />
          </Paper>
        </div>
        <div className="right">
          {theme === "light" ? (
            <LightModeIcon className="mode" sx={{ fontSize: "20px" }} />
          ) : (
            <DarkModeIcon className="mode" sx={{ fontSize: "20px" }} />
          )}
          <Switch
            defaultChecked={theme === "light" ? false : true}
            onChange={onSwitch}
            color="tertiary"
            className="switch"
            sx={{ marginRight: "30px" }}
          />
          <IconButton
            className="icon1"
            sx={{ borderRadius: 1 }}
            onClick={() => navigate("/feed")}
          >
            <HomeIcon />
          </IconButton>
          <IconButton
            className="icon1"
            sx={{ borderRadius: 1 }}
            onClick={(event) => {
              if (notifications.length > 0) {
                setAnchorElNotif(event.currentTarget);
              }
            }}
          >
            <Badge badgeContent={notifications.length} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            className="icon2"
            id="menu"
            size="large"
            edge="start"
            aria-label="open drawer"
            sx={{
              marginLeft: "2px",
              color: () => (theme === "light" ? "#1C2835" : "#f2f2f2"),
            }}
            onClick={handleOpenMenu}
          >
            <MenuIcon className="icons" />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseMenu}
            sx={{ width: "500px", paddingTop: "-30px" }}
          >
            <Paper
              className="menu-paper"
              sx={{
                backgroundColor: () =>
                  theme === "light" ? "#f2f2f2" : "#272727",
                height: "auto",
              }}
            >
              <MenuItem
                className="menuItem"
                sx={{
                  fontFamily: "montserrat",
                  backgroundColor: () =>
                    theme === "light" ? "#f2f2f2" : "#333333",
                  color: () => (theme === "light" ? "#333333" : "#f2f2f2"),
                  marginTop: "-6px",
                  marginBottom: ".5px",
                  borderBottom: "2px",
                }}
                onClick={() => GoToProfile(currentUser)}
              >
                <AccountCircleIcon />
                &nbsp;&nbsp;Profile
              </MenuItem>
              <div className="home">
                <MenuItem
                  className="menuItem"
                  sx={{
                    fontFamily: "montserrat",
                    backgroundColor: () =>
                      theme === "light" ? "#f2f2f2" : "#333333",
                    color: () => (theme === "light" ? "#333333" : "#f2f2f2"),
                    marginBottom: ".5px",
                    borderBottom: "2px",
                  }}
                  onClick={() => navigate("/feed")}
                >
                  <HomeIcon />
                  &nbsp;&nbsp;Home
                </MenuItem>
              </div>
              <MenuItem
                className="menuItem"
                sx={{
                  fontFamily: "montserrat",
                  backgroundColor: () =>
                    theme === "light" ? "#f2f2f2" : "#333333",
                  color: () => (theme === "light" ? "#333333" : "#f2f2f2"),
                  marginBottom: "1px",
                  borderBottom: "2px",
                }}
                onClick={goToLatchlist}
              >
                <PeopleIcon />
                &nbsp; Latch list
              </MenuItem>
              <MenuItem
                className="menuItem"
                sx={{
                  fontFamily: "montserrat",
                  backgroundColor: () =>
                    theme === "light" ? "#f2f2f2" : "#333333",
                  color: () => (theme === "light" ? "#333333" : "#f2f2f2"),
                  marginBottom: "-6px",
                }}
                onClick={onLogout}
              >
                <MeetingRoomIcon />
                &nbsp;&nbsp;Logout
              </MenuItem>
            </Paper>
          </Menu>
          <Menu
            id="basic-menu"
            anchorEl={anchorElNotif}
            open={openNotif}
            onClose={handleCloseNotifs}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem
              disableRipple
              disableTouchRipple
              sx={{
                pointerEvents: "none",
                borderBottom: "solid 1px ",
                borderColor: "#9b9b9b",
              }}
            >
              <ListItemText>
                <Typography variant="button">Notifications</Typography>
              </ListItemText>
            </MenuItem>
            {notifications.map((notification) => (
              <MenuItem>
                <ListItemIcon>
                  <PriorityHighOutlinedIcon />
                </ListItemIcon>
                <ListItemText
                  onClick={() => {
                    navigate(notification.url);
                    window.location.reload();
                  }}
                >
                  {notification.field}
                </ListItemText>
                <ListItemIcon
                  sx={{ ml: 2, mr: "-20px" }}
                  onClick={async () => {
                    await deleteNotification(notification.id).then(
                      setNotifications(
                        notifications.filter(
                          (notif) => notif.id !== notification.id
                        )
                      )
                    );
                  }}
                >
                  <CloseIcon />
                </ListItemIcon>
              </MenuItem>
            ))}
            <MenuItem
              sx={{
                borderTop: "solid 1px ",
                borderColor: "#9b9b9b",
              }}
              onClick={handleClearNotifications}
            >
              <ListItemText>
                <Typography variant="button">Clear All</Typography>
              </ListItemText>
              <ListItemIcon>
                <DoneAllIcon />
              </ListItemIcon>
            </MenuItem>
          </Menu>
        </div>
      </Grid>
    </Grid></div>
  );
};
export default NavBar;
