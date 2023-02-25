import { Grid, Paper } from '@mui/material'
import React from 'react'

const PostSide = () => {
  return (
    <div style={{ minWidth: "100%", marginTop: "5px"}}>
    <Grid container sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
        <Paper sx={{width: "95%", height: "auto"}}>
            Post
        </Paper>
    </Grid>
    </div>
  )
}

export default PostSide