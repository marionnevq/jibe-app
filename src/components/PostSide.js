import { Chip, Divider, Grid, Paper } from "@mui/material";
import { Box } from "@mui/system";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFollowingPost, getWorldPost } from "../services/post";
import { getCurrentUser } from "../services/user";
import PostComponent from "./PostComponent";
import PostForm from "./PostForm";

const PostSide = ({ theme, setLoading }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const [postDate, setPostDate] = useState("");
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const [choice, setChoice] = useState(true);
  const [image, setImage] = useState(null);
  const imageRef = useRef();

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage({
        image: URL.createObjectURL(img),
      });
    }
  };

  const [like, setLike] = useState(false);
  const handleChangeIcon = () => {
    if (like === false) {
      setLike(true);
    } else {
      setLike(false);
    }
  };

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  //get post
  useEffect(() => {
    loadUser();
  }, []);

  const convertTime = (postDate) => {
    TimeAgo.addLocale(en);
    const timeAgo = new TimeAgo("en-US");
    const ago = timeAgo.format(new Date(postDate));
    return ago;
  };

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

  const handleWorldFollowing = async () => {
    await getWorldPost().then(async (response) => {
      console.log(response.data);
      setPosts(response.data);
    });

    await getCurrentUser().then((response) => {
      setCurrentUser(response.data);
    });
  };

  const handleShowFollowing = async () => {
    await getFollowingPost().then((response) => {
      console.log(response.data);
      setPosts(response.data);
    });
  };

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

        <Divider className="divider" sx={{ borderBottomWidth: 3 }}>
          <Chip
            className="dividerChip"
            label="World"
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
            <PostComponent post={post} currentUser={currentUser} />
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default PostSide;
