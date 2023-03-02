import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SendIcon from "@mui/icons-material/Send";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Collapse,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditComment from "../components/EditComment";
import NavBar from "../components/NavBar";
import liked from "../images/liked.png";
import unlike from "../images/unlike.png";
import * as commentService from "../services/comment";
import { checkLiked, createLike, getLike, removeLike } from "../services/like";
import * as postService from "../services/post";
import * as userService from "../services/user";
import "../style/Feed.css";

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
  const navigate = useNavigate();

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

  const convertTime = (postDate) => {
    TimeAgo.addLocale(en);
    const timeAgo = new TimeAgo("en-US");
    const ago = timeAgo.format(new Date(postDate));
    return ago;
  };

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

  const [openEdit, setOpenEdit] = React.useState(false);
  const opened = Boolean(openEdit);
  const [editComment, setEditComment] = useState(null);
  const handleOpenEditComment = (comment) => {
    setEditComment(comment);
    setOpenEdit(true);
  };
  const handleCloseEditComment = () => {
    setEditComment(null);
    setOpenEdit(false);
  };
  return (
    <div data-theme={theme} className="parent">
      <Modal
        open={opened}
        onClose={handleCloseEditComment}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
        sx={{ overflow: "scroll" }}
      >
        <EditComment
          handleCloseEditComment={handleCloseEditComment}
          comment={editComment}
          setLoading={setLoading}
          setOpen={setOpen}
          setSeverity={setSeverity}
          setSnackbarMessage={setSnackbarMessage}
        />
      </Modal>
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
          minHeight: "100vh",
        }}
      >
        <Grid item xs={12} md={5}>
          <Paper
            className="post"
            sx={{
              width: "95%",
              minHeight: "140px",
              maxHeight: "auto",
              paddingBottom: "2px",
              borderRadius: "5px",
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
                <span>{post == null ? "" : convertTime(post.datePosted)}</span>
              </Box>
            </Box>
            <Box className="postContent" sx={{ p: 0.2 }}>
              <div className="postContent2">
                <Box className="txtContent" sx={{ p: 0.2, mb: 1 }}>
                  <span>{post == null ? "" : post.body}</span>
                </Box>
                {post && post.imageUrl && (
                  <Box
                    className="imgBoxx"
                    sx={{
                      display: "flex",
                      border: "none",
                      marginBottom: "10px",
                    }}
                  >
                    <img
                      src={post.imageUrl}
                      style={{
                        width: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                )}
              </div>
            </Box>
            <Divider className="div2" />
            <Box className="reactions" sx={{ p: 0.2, marginBottom: "5px" }}>
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
                <Button className="commentButton" onClick={handleExpandClick}>
                  <ModeCommentOutlinedIcon />
                  <span>Comment</span>
                </Button>
              </Box>
            </Box>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <Box
                className="commentComponent"
                px={2}
                pb={1}
                textAlign="center"
              >
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
                  InputProps={{
                    className: "inputTextfield",
                    sx: { height: "auto", fontFamily: "montserrat" },
                  }}
                />

                <Box className="commentBtn">
                  <SendIcon onClick={handleAddComment} />
                </Box>
                {/* <Button
                  variant="contained"
                  size="small"
                  startIcon={}
                  onClick={handleAddComment}
                  className="commentBtn"
                >
                </Button> */}
              </Box>
            </Collapse>
          </Paper>
          <Divider sx={{ marginBottom: 1, borderColor: "pink" }}>
            <Chip
              className="dividerChip"
              label="COMMENTS"
              sx={{ fontFamily: "Montserrat" }}
            />
          </Divider>
          <Paper
            className="post"
            sx={{
              width: "95%",
              minHeight: "160px",
              maxHeight: "100vh",
              borderRadius: "5px",
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
                  <ListItem
                    alignItems="flex-start"
                    key={comment.commentID}
                    secondaryAction={
                      comment.userID !== user.id ? (
                        ""
                      ) : (
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => {
                            handleOpenEditComment(comment);
                          }}
                        >
                          <MoreHorizIcon />
                        </IconButton>
                      )
                    }
                  >
                    <ListItemAvatar>
                      <Avatar
                        alt={comment.userUsername}
                        onClick={() => {
                          navigate(`/profile/visit/${comment.userUsername}`);
                        }}
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
                      onClick={() => {
                        navigate(`/profile/visit/${comment.userUsername}`);
                      }}
                      primary={
                        <Box className="commentsInfo" sx={{ fontSize: "14px" }}>
                          {comment.userUsername}
                          <Typography
                            variant="caption"
                            display="inline-block"
                            color="text.secondary"
                            sx={{ float: "right", fontFamily: "Montserrat" }}
                            className="username"
                          >
                            {convertTime(comment.dateCommented)}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Box className="commentValue">
                          <Typography
                            sx={{
                              display: "inline",
                              fontFamily: "Montserrat",
                              fontWeight: "400",
                            }}
                            className="username"
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {comment.value}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                  <Divider
                    className="dividerComment"
                    variant="inset"
                    component="li"
                  />
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
