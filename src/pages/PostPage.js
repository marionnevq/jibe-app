import {
  Avatar,
  Box,
  Button,
  Chip,
  Collapse,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import * as postService from "../services/post";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import SendIcon from "@mui/icons-material/Send";
import * as commentService from "../services/comment";
import * as userService from "../services/user";
import "../style/Feed.css";
import unlike from "../images/unlike.png";
import liked from "../images/liked.png";
import { checkLiked, createLike, getLike, removeLike } from "../services/like";

const PostPage = ({
  postId,
  theme,
  onLogout,
  onSwitch,
  setLoading,
  setOpen,
  setSnackbarMessage,
  setSeverity,
}) => {
  const [expanded, setExpanded] = useState(false);
  const params = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentForm, setCommentForm] = useState("");
  const [user, setUser] = useState(null);
  const [like, setLike] = useState(false);

  async function selectPost() {
    const post = await postService.getPost(params.postId);
    const comment = await commentService.getComments(params.postId);
    const user = await userService.getCurrentUser();
    const like = await checkLiked(params.postId, user.data.id);
    setUser(user.data);
    setComments(comment.data);
    setPost(post.data);
    setLike(like.data);
    console.log(post.data);
    var date = new Date().getTime();
    console.log(date.toString());
  }

  useEffect(() => {
    selectPost();
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleChange = ({ currentTarget: input }) => {
    setCommentForm(input.value);
  };

  const handleAddComment = async () => {
    const commentToAdd = {
      value: commentForm,
      media: "",
      userID: user.id,
    };

    setLoading(true);
    await commentService
      .addComment(params.postId, commentToAdd)
      .then(async () => {
        const comment = await commentService.getComments(params.postId);
        setComments(comment.data);
        setCommentForm("");
        handleExpandClick();
        setSnackbarMessage("Created Comment");
        setSeverity("success");
        setLoading(false);
        setOpen(true);
      });
  };

  const handleChangeIcon = async () => {
    await checkLiked(params.postId, user.id).then(async (response) => {
      let isLiked = response.data;
      if (!isLiked) {
        await createLike(params.postId, user.id).then(async (response) => {
          setLike(!like);
        });
      } else {
        await getLike(params.postId, user.id).then(async (response) => {
          let reactionID = response.data.reactionID;

          await removeLike(reactionID).then((response) => {
            setLike(!like);
          });
        });
      }
    });
  };

  return (
    <div data-theme={theme} className="parent">
      <NavBar onLogout={onLogout} onSwitch={onSwitch} theme={theme} />
      <Grid
        container
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          marginTop: "20px",
          height: "100vh",
        }}
      >
        <Grid item xs={12} md={5}>
          <Paper
            className="post"
            sx={{
              width: "95%",
              minHeight: "160px",
              maxHeight: "100vh",
              paddingBottom: "2px",
              borderRadius: "0.6rem",
              boxShadow: "3",
            }}
          >
            <Box className="info" sx={{ p: 0.2 }}>
              <Box className="opImg" sx={{ p: 1 }}>
                <div className="opInfo">
                  <Avatar
                    src={
                      post &&
                      (post.userImageUrl == null ? "" : post.userImageUrl)
                    }
                  ></Avatar>
                </div>
              </Box>
              <Box className="opName" sx={{ p: 1 }}>
                <span>
                  {post == null
                    ? ""
                    : `${post.userFirstname} ${post.userLastname}`}
                </span>
                <span>{post == null ? "" : post.datePosted}</span>
              </Box>
            </Box>
            <Box className="postContent" sx={{ p: 0.2 }}>
              <div className="postContent2">
                <Box className="txtContent" sx={{ p: 0.2, mb: 1 }}>
                  <span>{post == null ? "" : post.body}</span>
                </Box>
                {post && post.imageUrl && (
                  <Box className="imgContent" sx={{ p: 1, display: "flex" }}>
                    <img
                      src={post.imageUrl}
                      style={{
                        width: "100%",
                        maxHeight: "40vh",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                )}
              </div>
            </Box>
            <Divider />
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
                <Button className="commentButton" onClick={handleExpandClick}>
                  <ModeCommentOutlinedIcon />
                  <span>Comment</span>
                </Button>
              </Box>
            </Box>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <Box px={2} pb={1} textAlign="center">
                <TextField
                  id="filled-multiline-static"
                  label="Comment"
                  multiline
                  rows={4}
                  defaultValue=""
                  variant="filled"
                  fullWidth
                  sx={{ mb: 1 }}
                  onChange={handleChange}
                  value={commentForm}
                  className="shareText"
                />

                <Button
                  variant="contained"
                  size="small"
                  startIcon={<SendIcon />}
                  onClick={handleAddComment}
                >
                  Send
                </Button>
              </Box>
            </Collapse>
          </Paper>
          <Divider sx={{ width: "95%", marginBottom: 1 }}>
            <Chip label="COMMENTS" sx={{ fontFamily: "Montserrat" }} />
          </Divider>
          <Paper
            className="post"
            sx={{
              width: "95%",
              minHeight: "160px",
              maxHeight: "100vh",
              borderRadius: "0.6rem",
              boxShadow: "3",
            }}
          >
            <List
              sx={{
                width: "98%",

                overflow: "auto",
              }}
            >
              {comments.map((comment) => (
                <>
                  <ListItem alignItems="flex-start" key={comment.commentID}>
                    <ListItemAvatar>
                      <Avatar
                        alt={comment.userUsername}
                        src={
                          comment.userImageUrl == null
                            ? comment.userUsername
                            : comment.userImageUrl
                        }
                      />
                    </ListItemAvatar>
                    <ListItemText
                      sx={{ fontFamily: "Montserrat" }}
                      className="name"
                      primary={
                        <>
                          {comment.userUsername}
                          <Typography
                            variant="caption"
                            display="inline-block"
                            color="text.secondary"
                            sx={{ float: "right", fontFamily: "Montserrat" }}
                            className="username"
                          >
                            {comment.dateCommented}
                          </Typography>
                        </>
                      }
                      secondary={
                        <>
                          <Typography
                            sx={{ display: "inline", fontFamily: "Montserrat" }}
                            className="username"
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {comment.value}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default PostPage;
