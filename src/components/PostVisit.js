import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import { Avatar, Button, Divider, Paper } from "@mui/material";
import { Box } from "@mui/system";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import liked from "../images/liked.png";
import unlike from "../images/unlike.png";
import { getUserPosts } from "../services/post";
import "../style/ProfileVisit.css";

const PostVisit = ({ theme, user }) => {
  const [like, setLike] = useState(false);
  const params = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    getUserPosts(params.username).then((response) => {
      console.log(response.data);
      setPosts(response.data);
      setLoading(false);
    });
  }, []);

  const convertTime = (postDate) => {
    TimeAgo.addLocale(en);
    const timeAgo = new TimeAgo("en-US");
    const ago = timeAgo.format(new Date(postDate));
    return ago;
  };

  const handleChangeIcon = () => {
    if (like === false) {
      setLike(true);
    } else {
      setLike(false);
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  const color = theme === "solid light" ? "lightgrey" : " solid Gray";

  return (
    <div

      style={{ display: "flex", flexDirection: "column", justifyContent: "center", marginTop: "10px" }}
    >
    {posts.map((post) => 
      <Paper
      className="post"
      sx={{ 
        backgroundColor: () => (theme === "light" ? "white" : "#333333")
      }}
    >
      {posts.map((post) => (
        <Paper
          className="post"
          sx={{
            backgroundColor: () => (theme === "light" ? "white" : "#333333"),
          }}
        >
          <Box className="info" sx={{ p: 0.2 }}>
            <Box className="opImg" sx={{ p: 1 }}>
              <div className="opInfo">
                <Avatar src={post === null ? "" : post.userImageUrl} alt="" />
              </div>
            </Box>
            <Box

              className="imgContent"
              sx={{ display: "flex", justifyContent: "center", width: "100%", border:"none", paddingTop: "10px", paddingBottom: "10px", marginBottom: "5px"}}
            >
               <img
              src={user === null ? "" : post.imageUrl}
              alt="" style={{width: "100%"}}
            />
            </Box>
          </Box>
          <Box
            className="postContent"
            sx={{
              p: 0.2,
              color: () => (theme === "light" ? "#333333" : "white"),
            }}
          >
            <div className="postContent2">
              <Box className="txtContent" sx={{ p: 0.2 }}>
                <span>{post.length === 0 ? "" : post.body}</span>
              </Box>
              {post.length === 0 ? null : (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    className="imgContent"
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                      borderTop: () =>
                        theme === "dark"
                          ? "1px solid #3F3F3F"
                          : "1px solid lightgrey",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                      marginBottom: "5px",
                    }}
                  >
                    <img
                      src={user === null ? "" : post.imageUrl}
                      alt=""
                      style={{ width: "65%" }}
                    />
                  </Box>
                </div>
              )}
            </div>
          </Box>
          {/* <Divider /> */}
          <Box
            className="reactions"
            sx={{
              p: 0.2,
              color: () => (theme === "light" ? "#333333" : "white"),
              borderTop: () =>
                theme === "dark" ? "1px solid #636363" : "1px solid lightgrey",
            }}
          >
            <Box className="like" sx={{ p: 0.2 }}>
              <div className="likebtn" onClick={handleChangeIcon}>
                <Button className="likeButton">
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
                className="commentButton"
                onClick={() => navigate(`/posts/${post.postID}`)}
              >
                <ModeCommentOutlinedIcon />
                <span>Comment</span>
              </Button>
            </Box>
          </Box>
          {/* <Divider sx={{ marginBottom: "10px" }} /> */}
        </Paper>
      ))}
    </div>
  );
};

export default PostVisit;
