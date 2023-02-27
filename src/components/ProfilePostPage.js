import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  CardHeader,
  IconButton,
  CardActions,
  Checkbox,
  Menu,
  MenuItem
} from "@mui/material";
import sana from "../images/sana.jpg";
import "../style/Profile.css";
import open from "../images/liked.png";
import close from "../images/unlike.png";
function ProfilePostPage({ post }) {

  const [like, setLike] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);


  const handleChangeIcon = () => {
    if (like === false) {
      setLike(true);
    } else {
      setLike(false);
    }
  };

  const menuId = "primary-search-account-menu";
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Edit</MenuItem>
      <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
    </Menu>
  );

  return (
    <>
      <Grid item xs={6} sx={{ backgroundColor: "#DFDEDB"}}></Grid>
      <Grid item xs={8} sx={{ backgroundColor: "#DFDEDB" }}>
        <Card sx={{ maxWidth: "50%" }} className="post">
          <CardHeader
            avatar={<Avatar src={sana} sx={{ bgcolor: "purple" }} />}
            action={
              <IconButton aria-label="settings" aria-haspopup="true" aria-controls={menuId} onClick={handleProfileMenuOpen}>
                <MoreVertIcon />
              </IconButton>
            }
            title={post.name}
            subheader={post.postDate}
          />
          <CardContent className="post-body">
            <Typography>{post.postMessage}</Typography>
            {}
          </CardContent>
          
          <CardActions disableSpacing >
            <IconButton className="likebtn" onClick={handleChangeIcon}>
              {
                like ? <img src={close} height="40px" /> : <img src={open} height="40px" />
              }
            </IconButton>
            <IconButton aria-label="comment">
              <CommentIcon />
            </IconButton>
          </CardActions>
        </Card>
        {renderMenu}
      </Grid>
      <Grid item xs={2} sx={{ backgroundColor: "#DFDEDB" }}>
      </Grid>
    </>
  );
}

export default ProfilePostPage;
