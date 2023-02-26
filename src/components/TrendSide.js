import { Box, Divider, Grid, Paper } from '@mui/material'
import React from 'react'


const TrendSide = () => {
  return (
    <div className='trendSide' style={{ minWidth: "100%", marginTop: "10px"}}>
    <Grid container className='trend-part' sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
        <Paper className='trends' sx={{width: "90%", height: "350px", paddingBottom: "10px", borderRadius:"0.6rem", boxShadow:"2"}}>
          <Grid item className='trendGrid' xs={12} sx={{ p: 2, display:"flex", justifyContent:"center", alignItems:"center" }}>
            <span>Talks for you</span>
          </Grid>
          <Divider variant="fullWidth" />
          <Grid item className='trendTopic' xs={12}>
            <Box className="talks" >
              {/* <Box className="rank" sx={{ width: "10%", p: 1}}>
                <span>1</span>
              </Box> */}
              <Box className="talksTopic" sx={{ width: "90%", p: 0.5}}>
                <span>Topic</span>
                <span>talks</span>
              </Box>
            </Box>
            <Box className="talks" >
              {/* <Box className="rank" sx={{ width: "10%", p: 1}}>
                <span>2</span>
              </Box> */}
              <Box className="talksTopic" sx={{ width: "90%", p: 0.5}}>
                <span>Talks for you</span>
                <span>talks</span>
              </Box>
            </Box>
            <Box className="talks" >
              {/* <Box className="rank" sx={{ width: "10%", p: 1}}>
                <span>3</span>
              </Box> */}
              <Box className="talksTopic" sx={{ width: "90%", p: 0.5}}>
                <span>Talks for you</span>
                <span>talks</span>
              </Box>
            </Box>
            <Box className="talks" >
              {/* <Box className="rank" sx={{ width: "10%", p: 1}}>
                <span>4</span>
              </Box> */}
              <Box className="talksTopic" sx={{ width: "90%", p: 0.5}}>
                <span>Talks for you</span>
                <span>talks</span>
              </Box>
            </Box>
            <Box className="talks" >
              {/* <Box className="rank" sx={{ width: "10%", p: 1}}>
                <span>5</span>
              </Box> */}
              <Box className="talksTopic" sx={{ width: "90%", p: 0.5}}>
                <span>Talks for you</span>
                <span>talks</span>
              </Box>
            </Box>
          </Grid>
        </Paper>
    </Grid>
    </div>
  )
}

export default TrendSide