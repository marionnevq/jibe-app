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
import PostComponent from "./PostComponent";
import { async } from "q";

const PostSide = ({ theme, onPosting, setLoading }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [postDate, setPostDate] = useState("");
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const [choice, setChoice]=useState(true)
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  // useEffect(async() => {
  //   loadUser();
  //   await getCurrentUser().then((response) => {
  //     setCurrentUser(response.data);
  //   }); 
  // }, []);

  // const loadUser = async () => {
    
  //   if(choice){
  //     await getWorldPost().then(async(response) => {
  //       console.log(response.data);
  //       setPosts(response.data);
  //     });
  //   }else{
  //     await getFollowingPost().then(async(response) => {
  //       console.log(response.data);
  //       setPosts(response.data);
  //     });
  //   }
  // };

  // const handleChoice = (option) => {
  //   if(option === "world"){
  //     setChoice(true);
  //   }else{
  //     setChoice(false)
  //   }
  // };

  useEffect(() => {
    loadUser();
  }, []);
  
  const loadUser = async () => {
    const world = await getWorldPost().then((response) => {
      console.log(response.data);
      setPosts(response.data);
    });
  
    const user = await getCurrentUser().then((response) => {
      setCurrentUser(response.data);
    }); 
  };
  
  const handleShowFollowing = async () => {
    await getFollowingPost().then((response) => {
      console.log(response.data);
      setPosts(response.data);
    });
  };
  
  const handleWorldFollowing = async () => {
    await getWorldPost().then((response) => {
      console.log(response.data);
      setPosts(response.data);
    });
  };
  
  // const handleWorldFollowing = async () => {
  //   await getWorldPost().then((response) => {
  //     console.log(response.data);
  //     setPosts(response.data);
  //   });
  // };

  return (
    <div className="postSide" style={{ minWidth: "100%", marginTop: "12px" }}>
      <Grid
        container
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Grid
          container
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper
            className="feedType"
            sx={{
              width: "95%",
              height: "45px",
              paddingBottom: "2px",
              borderRadius: "0.6rem",
              boxShadow: "1",
            }}
          >
            <Box
              className="fyp"
              onClick={handleWorldFollowing}
              sx={{
                width: "25%",
                height: "45px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              
            >
              <span style={{ cursor: "pointer" }}>World</span>
            </Box>
            {/* <Divider orientation="vertical" variant="middle" flexItem /> */}
            <Box
              className="fyp"
              onClick={handleShowFollowing}
              sx={{
                width: "25%",
                height: "45px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <span style={{ cursor: "pointer" }}>For You</span>
            </Box>
          </Paper>
        </Grid>

        <PostForm
          currentUser={currentUser}
          theme={theme}
          setLoading={setLoading}
        />

        <Divider className="divider">
          <Chip
            className="dividerChip"
            label="WORLD"
            sx={{ fontFamily: "Montserrat" }}
          />
        </Divider>

        <Grid
          container
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
        {posts.map((post) => (
         <PostComponent post={post} currentUser={currentUser} />))}
        </Grid>
      </Grid>
    </div>
  );
};

export default PostSide;
