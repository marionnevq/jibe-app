import React from 'react'
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


const CommentPage = () => {
    return (
    <>
        <Grid container spacing={2} columns={16} className="posts-container">
            <Grid item xs={6} sx={{ backgroundColor: "#DFDEDB" }}></Grid>
            <Grid item xs={8} sx={{ backgroundColor: "#DFDEDB" }}>
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

                    <CardActions disableSpacing>
                        <IconButton className="likebtn" onClick={handleChangeIcon}>
                            {like ? <img src={close} height="40px" /> : <img src={open} height="40px" />}
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
        </Grid>
        <Grid container spacing={2} columns={16} className="posts-container">
            {posts.map((post) => (
                <ProfilePostPage key={posts.id} post={post} />
            ))}
        </Grid>
    </>
    )
}

export default CommentPage;