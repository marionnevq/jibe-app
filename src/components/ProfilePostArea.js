import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getUser } from "../services/auth";
import { getUserPosts } from "../services/post";

import ModeCommentIcon from "@mui/icons-material/ModeComment";
import "../style/Profile.css";
import PostComponent from "./PostComponent";

const ProfilePostArea = ({
  theme,
  setLoading,
  setOpen,
  setSnackbarMessage,
  setSeverity,
}) => {
  const [like, setLike] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const opening = Boolean(anchorEl);
  const [currentUser, setCurrentUser] = useState("");
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const current = await getUser();
    setCurrentUser(current.data);
    await getUserPosts(current.data.username).then((userPosts) => {
      setPosts(userPosts.data);
      console.log(userPosts.data);
    });
  };

  return (
    <div
      data-theme={theme}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginTop: "10px",
        // marginLeft: "1.3rem",
      }}
    >
      {posts.map((post) => (
        <PostComponent
          post={post}
          theme={theme}
          setLoading={setLoading}
          setSnackbarMessage={setSnackbarMessage}
          setSeverity={setSeverity}
          setOpen={setOpen}
        ></PostComponent>
      ))}
    </div>
  );
};

export default ProfilePostArea;
