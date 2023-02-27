import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import * as postService from "../services/post";
import alternate from "../images/alternate.jpg";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";

const PostPage = ({ postId, theme, onLogout, onSwitch }) => {
  const params = useParams();

  async function selectPost() {
    const post = await postService.getPost(params.postId);
    console.log(post.data);
  }
  useEffect(() => {
    selectPost();
  }, []);

  return (
    <div data-theme={theme} className="parent">
      <NavBar onLogout={onLogout} onSwitch={onSwitch} theme={theme} />
      <Grid container sx={{ minHeight: "100vh", justifyContent: "center" }}>
        <Grid item xs={12} md={6} mt={2}>
          {/* CARD */}
          <Card sx={{ minWidth: 275 }}>
            <CardHeader
              avatar={<Avatar src={alternate}></Avatar>}
              title={"Christian Alday"}
              subheader={
                <>
                  {" "}
                  <Typography variant="body3" component="div">
                    {"@aldayforu"}
                  </Typography>
                  <Typography variant="body4" component="div">
                    {"a few minutes ago"}
                  </Typography>
                </>
              }
            />
            <CardContent>
              <Typography variant="body1" color="text.primary" ml={6}>
                Sample Post! Go Jibe!!!
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "center", display: "flex" }}>
              <Grid
                container
                sx={{ justifyContent: "center", display: "flex" }}
              >
                <Grid
                  item
                  xs={6}
                  sx={{
                    justifyContent: "center",
                    display: "flex",
                    borderTop: 1,
                    borderColor: "text.secondary",
                  }}
                >
                  <Button size="small" startIcon={<PlayCircleOutlineIcon />}>
                    Jibe
                  </Button>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{
                    justifyContent: "center",
                    display: "flex",
                    borderTop: 1,
                    borderColor: "text.secondary",
                  }}
                >
                  <Button size="small" startIcon={<ModeCommentOutlinedIcon />}>
                    Comment
                  </Button>
                </Grid>
              </Grid>
            </CardActions>
          </Card>
          <Typography variant="h6" color="text.primary">
            COMMENTS
          </Typography>
          <Card sx={{ minWidth: 275, marginTop: 2 }}>
            <CardContent>
              <List
                sx={{
                  width: "100%",
                  bgcolor: "background.paper",
                }}
              >
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Brunch this weekend?"
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          Ali Connors
                        </Typography>
                        {" — I'll be in your neighborhood doing errands this…"}
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar
                      alt="Travis Howard"
                      src="/static/images/avatar/2.jpg"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Summer BBQ"
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          to Scott, Alex, Jennifer
                        </Typography>
                        {" — Wish I could come, but I'm out of town this…"}
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar
                      alt="Cindy Baker"
                      src="/static/images/avatar/3.jpg"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Oui Oui"
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          Sandra Adams
                        </Typography>
                        {" — Do you have Paris recommendations? Have you ever…"}
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
          {/* CARD END*/}
        </Grid>
      </Grid>
    </div>
  );
};

export default PostPage;
