import React, { useState, useEffect } from 'react'
import sana from "../images/sana.jpg"
import { Grid, Avatar, CardHeader, IconButton, CardActions} from '@mui/material'
import "../style/Profile.css";
import Card from '@mui/material/Card';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';

const ProfilePage = () => {
  const [posts, setPosts] = useState([])
  const [followers, setFollowers] = useState([])
  const [following, setFollowing] = useState([])

  const getPosts = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts")
    const data = await response.json()
    setPosts(data)
  }
  const getFollowers = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users")
    const data = await response.json()
    setFollowers(data)
  }
  const getFollowing = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users")
    const data = await response.json()
    setFollowing(data)
  }
  useEffect(() => {
    getPosts()
    getFollowers()
    getFollowing()
  }, [])

  return (
    <>
      <Grid container style={{ minHeight: "100vh" }} spacing={3} className='main-container'>
        <Grid item xs={5}>
          <div className='profile-pic'>
            <Avatar src={sana} sx={{ width: 250, height: 250 }} />
          </div>
        </Grid>
        <Grid item xs>
          <div className='profile-name'>
            Nikki Fagara
          </div>
          <div className='profile-tag'>
            @NikkiFagara
          </div>
          <div className='profile-bio'>
            <em>"I am the greatest..."</em>
          </div>
          <Grid container spacing={2} columns={15} className='sub-container'>
            <Grid item xs={3} className='left'>
              <div className='left-title'>Posts</div>
              <div className='left-sub'>12345</div>
            </Grid>
            <Grid item xs={4} className='middle'>
              <div className='middle-title'>Followers</div>
              <div className='middle-sub'>5.6m</div>
            </Grid>
            <Grid item xs={2} className='right'>
              <div className='right-title'>Following</div>
              <div className='right-sub'>3</div>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={2} columns={16} className='posts-container'>
          <Grid item xs={6}>
          </Grid>
          <Grid item xs={8} className='post'>
            <Card sx={{ maxWidth: "50%" }}>
              <CardHeader
                avatar={
                  <Avatar src={sana} sx={{ bgcolor: "red" }} aria-label="Nikki">
                    N
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title="Nikki Fagara"
                subheader="September 14, 2016"
              />
              <CardContent className='post-body'>
                <Typography className='post-body'>
                  Testing post section
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="comment">
                  <CommentIcon />
                </IconButton>
              </CardActions>  
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </>

  )
}

export default ProfilePage