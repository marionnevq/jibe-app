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
import open from "../images/open.png";
import close from "../images/close.png";
import CommentSection from "../components/CommentSection"
import NavBar from "../components/NavBar";

const CommentPage = ({ posts }) => {
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
    <NavBar />
        <Grid container spacing={2} columns={16} className="posts-container">
            <Grid item xs={6} ></Grid>
            <Grid item xs={8} >
                <Card sx={{ maxWidth: "50%" }} className="post">
                    <CardHeader
                        avatar={<Avatar src={sana} sx={{ bgcolor: "purple" }} />}
                        action={<IconButton aria-label="settings" aria-haspopup="true" aria-controls={menuId} onClick={handleProfileMenuOpen}>
                            <MoreVertIcon />
                        </IconButton>}
                        title={"Sana Minatozaki"}
                        subheader={"December 29, 2022"} />
                    <CardContent className="post-body">
                        <Typography>This is the main Post</Typography>

                    </CardContent>

                    <CardActions>
                        <IconButton className="likebtn" onClick={handleChangeIcon}>
                            {like ? <img src={close} height="40px" /> : <img src={open} height="40px" />}
                        </IconButton> 
                            {like ? <Typography>Liked</Typography> : <Typography>Like</Typography>}
                        <IconButton aria-label="comment">
                            <CommentIcon />
                        </IconButton>
                        Comment
                    </CardActions>
                </Card>
                {renderMenu}
            </Grid>
            <Grid item xs={2}>
            </Grid>
        </Grid>
        <Grid container spacing={2} columns={16} className="posts-container">
            {posts.map((post) => (
                <CommentSection key={posts.id} post={post} />
            ))}
        </Grid>
    </>
    )
}

export default CommentPage;