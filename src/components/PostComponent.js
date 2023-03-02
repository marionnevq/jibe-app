import {
    Button,
    Chip,
    Divider,
    Grid,
    IconButton,
    InputBase,
    Menu,
    MenuItem,
    Paper,
    TextField,
  } from "@mui/material";
  import { Box, color } from "@mui/system";
  import React, { useEffect, useRef, useState } from "react";
  import { getCurrentUser } from "../services/user";
  
  import unlike from "../images/unlike.png";
  import liked from "../images/liked.png";
  import unlikeDark from "../images/unlike-dark.png";
  import likedDark from "../images/liked-dark.png";
  import mk from "../images/mark.jpg";
  import test from "../images/test.jpg";
  import dp from "../images/nik.jpg";
  import Joi from "joi";
  
  import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
  import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
  import EditRoundedIcon from "@mui/icons-material/EditRounded";
  import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
  import { getWorldPost, getFollowingPost } from "../services/post";
  import { useNavigate } from "react-router-dom";
  import PostForm from "./PostForm";
import { checkLiked, createLike, getLike, removeLike } from "../services/like";
import "../style/Feed.css"

const PostComponent = ({post}) => {

    const[like, setLike] = useState(false);
    const[currentUser, setCurrentUser] = useState(false);

    useEffect(() => {
        console.log(currentUser);
        loadPost();
    }, [])

    const loadPost = async() => {
        await getCurrentUser().then(async(response)=> {
            setCurrentUser(response.data);
            await checkLiked(post.postID, response.data.id).then((response)=>{
                console.log(response.data);
                setLike(response.data);
            })
        })
    }

    const handleChangeIcon = async() => {
        await checkLiked(post.postID, currentUser.id).then(async(response)=>{
            let isLiked = response.data;
            if(!isLiked){
                await createLike(post.postID, currentUser.id).then(async (response) => {
                    setLike(true);
                  });
            }else{
                await getLike(post.postID, currentUser.id).then(async (response) => {
                    let reactionID = response.data.reactionID;
          
                    await removeLike(reactionID).then((response) => {
                      setLike(false);
                    });
                });
            }
        })
    };

  return (
    <Paper 
        className="post"
        sx={{
        width: "95%",
        minHeight: "160px",
        maxHeight: "690px",
        paddingBottom: "2px",
        borderRadius: "0.6rem",
        boxShadow: "1",
        }}
    >
        <Box className="info" sx={{ p: 0.2 }}>
        <Box className="opImg" sx={{ p: 1 }}>
            <div className="opInfo">
            <img
                src={post.userImageUrl === null ? "" : post.userImageUrl}
                alt=""
            />
            </div>
        </Box>
        <Box className="opName" sx={{ p: 1 }}>
            <span>
            {post === null
                ? ""
                : `${post.userFirstname} ${post.userLastname}`}
            </span>
            <span>a few minutes ago</span>
        </Box>
        </Box>
        <Box className="postContent" sx={{ p: 0.2 }}>
        <div className="postContent2">
            <Box className="txtContent" sx={{ p: 0.2 }}>
            <span>{post.length === 0 ? "" : post.body}</span>
            </Box>
            <Box className="imgContent" sx={{ p: 1, display: "flex" }}>
            <img src={`${post.imageUrl}`} style={{ width: "100%" }} />
            </Box>
        </div>
        </Box>
        <Divider className="divider" />
        <Box className="reactions" sx={{ p: 0.2 }}>
        <Box className="like" sx={{ p: 0.2 }}>
            <div className="likebtn" onClick={handleChangeIcon}>
            <Button className="likeButton">
                {like ? <img src={liked} /> : <img src={unlike} />}
                {like ? <span>Liked</span> : <span>Like</span>}
            </Button>
            </div>
        </Box>
        <Box className="comment" sx={{ p: 0.2 }}>
            <Button className="commentButton">
            <ModeCommentOutlinedIcon />
            <span>Comment</span>
            </Button>
        </Box>
        </Box>
        <Divider className="divider" sx={{ marginBottom: "10px" }} />
    </Paper>
  )
}

export default PostComponent