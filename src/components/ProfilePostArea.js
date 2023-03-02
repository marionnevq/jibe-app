import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../services/auth";
import { getUserPosts } from "../services/post";
import PostComponent from "./PostComponent";
const ProfilePostArea = ({ theme }) => {
  const [like, setLike] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const opening = Boolean(anchorEl);
  const [currentUser, setCurrentUser] = useState("");
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const opened = Boolean(open);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
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
    const current = await getUser();
    setCurrentUser(current.data);
    await getUserPosts(current.data.username).then((userPosts) => {
      setPosts(userPosts.data);
      console.log(userPosts.data);
    });
  };
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

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginTop: "10px",
        marginLeft: "1.3rem",
      }}
    >
      {posts.map((post) => (
        <PostComponent post={post} theme={theme}></PostComponent>
      ))}
    </div>
  );
};

export default ProfilePostArea;
