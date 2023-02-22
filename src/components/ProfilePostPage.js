import React from "react";
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

function ProfilePostPage({ post }) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

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
      <Grid item xs={6}></Grid>
      <Grid item xs={8}>
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
          </CardContent>
          <CardActions disableSpacing>
            <Checkbox
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite sx={{ color: "purple" }} />}
            />
            <IconButton aria-label="comment">
              <CommentIcon />
            </IconButton>
          </CardActions>
        </Card>
        {renderMenu}
      </Grid>
    </>
  );
}

export default ProfilePostPage;
