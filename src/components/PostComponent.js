import {
    Avatar,
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
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../services/user";
import unlike from "../images/unlike.png";
import liked from "../images/liked.png";
import alt from "../images/alternate.jpg";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import { checkLiked, createLike, getLike, removeLike } from "../services/like";
import "../style/Feed.css"
import { useNavigate } from "react-router-dom";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import ModeCommentIcon from "@mui/icons-material/ModeComment";

const PostComponent = ({post, theme}) => {

    const[like, setLike] = useState(false);
    const[currentUser, setCurrentUser] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        console.log(currentUser);
        loadPost();
    }, [])

    const convertTime = (postDate) => {
        TimeAgo.addLocale(en);
        const timeAgo = new TimeAgo("en-US");
        const ago = timeAgo.format(new Date(postDate));
        return ago;
    };

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
    data-theme={theme}
              className="post"
              sx={{
                width: "94%",
                height: "auto",
                paddingBottom: "2px",
                borderRadius: "5px",
                boxShadow: "3",
              }}
              
            >
              <Box className="info" sx={{ p: 0.2 }}>
                <Box className="opImg" sx={{ p: 1 }}>
                  <div className="opInfo">
                    <Avatar
                      src={post.userImageUrl === null ? alt : post.userImageUrl}
                      onClick={() => {
                        navigate(`/profile/visit/${post.userUsername}`);
                      }}
                      alt=""
                    />
                  </div>
                </Box>
                <Box className="opName" sx={{ p: 1 }}>
                  <span
                    onClick={() => {
                      navigate(`/profile/visit/${post.userUsername}`);
                    }}
                  >
                    {post === null
                      ? ""
                      : `${post.userFirstname} ${post.userLastname}`}
                  </span>

                  <span>{convertTime(post.datePosted)}</span>
                </Box>
              </Box>
              <Box className="postContent" sx={{ p: 0.2 }}>
                <div className="postContent2">
                  <Box className="txtContent" sx={{ p: 0.2 }}>
                    <span>{post.length === 0 ? "" : post.body}</span>
                  </Box>
                  {post && post.imageUrl === null ? (
                    ""
                  ) : (
                    <Box
                      className="imgBox"
                      sx={{
                        // p: 1,
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                        paddingTop: "5px",
                        paddingBottom: "5px",
                        border: "none"
                      }}
                    >
                      <img
                        src={`${post.imageUrl}`}
                        style={{ width: "100%", height: "70%", border: "none" }}
                      />
                    </Box>
                  )}
                  <Box className="txtContent" sx={{ p: 0.2 }}>
                    <Box sx={{  width: "50%", paddingLeft: "50px" }}>
                      <span>
                        {post.numLikes === 0 ? (
                          ""
                        ) : (
                          <img
                            src={liked}
                            alt=""
                            style={{ width: "25px", height: "25px" }}
                          />
                        )}
                        &nbsp;{post.numLikes === 0 ? "" : `${post.numLikes}`}
                      </span>
                      </Box>

                    <Box className="commentBox" sx={{ width: "50%", display: "flex", justifyContent: "flex-end", paddingRight: "50px" }}>      
                      <span>
                        {post.numComments === 0 ? (
                          ""
                        ) : (
                          <ModeCommentIcon
                            sx={{
                              color: "#ff5d75",
                              width: "15px",
                              height: "15px",
                            }}
                          />
                        )}
                        &nbsp;{post.numComments === 0 ? "" : `${post.numComments}`}
                      </span>
                    </Box>  
                    {/* <span> <img src={liked} style={{width: "20px", height: "20px" }}/> {`${post.numLikes}`}</span> */}
                  </Box>
                </div>
              </Box>
              <Divider className='divider'/>
              <Box
                className="reactions"
                sx={{
                  p: 0.2,
                  color: () => (theme === "light" ? "#333333" : "white"),
                }}
              >
                <Box className="like" sx={{ p: 0.2 }}>
                  <div className="likebtn" onClick={handleChangeIcon}>
                    <Button className="likeButton" sx={{ width: "280px" }}>
                      {like ? <img src={liked} /> : <img src={unlike} />}
                      {like ? <span>Liked</span> : <span>Like</span>}
                    </Button>
                  </div>
                </Box>
                <Divider
                  className="divider"
                  sx={{ height: 28, m: 0.5 }}
                  orientation="vertical"
                />
                <Box className="comment" sx={{ p: 0.2 }}>
                  <Button
                    className="commentButton" sx={{ width: "280px" }}
                    onClick={() => {
                      navigate(`/posts/${post.postID}`);
                    }}
                  >
                    <ModeCommentOutlinedIcon />
                    <span>Comment</span>
                  </Button>
                </Box>
              </Box>
              {/* <Divider className='divider' sx={{ marginBottom:"10px" }}/> */}
            </Paper>

  )
}

export default PostComponent