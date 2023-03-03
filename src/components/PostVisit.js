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
import PostComponent from "./PostComponent";

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
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginTop: "10px",
      }}
    >
      {posts.map((post) => (
        <PostComponent post={post} theme={theme} />
      ))}
    </div>
  );
};

export default PostVisit;
