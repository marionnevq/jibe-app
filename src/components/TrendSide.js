
import { Box, Grid,} from '@mui/material'
import React from 'react'

const TrendSide = ({ theme }) => {

  return (
    <div className='trendSide' style={{ minWidth: "100%", marginTop: "10px" }}>
    <Grid container sx={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
      <Box sx={{ height: "auto", display:"flex", flexDirection:"column", width: "90%", textAlign:"center", lineHeight: "1px" }}>
      <Box className="titleSale" sx={{ height: "40px" }}>
          <h4 style={{ fontWeight: 600 }}>Check this Summer Sale</h4>
        </Box>
        <Box>
        <img src="https://storage.pixteller.com/designs/designs-videos/1602835-5cd145ef223bb/thumb.gif"/>
        </Box>
      </Box>
      <Box sx={{ height: "auto", display:"flex", flexDirection:"column", width: "90%", textAlign:"center", lineHeight: "1px", marginTop:"20px" }}>
        <Box className="titleSale" sx={{ height: "40px" }}>
          <h4 style={{ fontWeight: 600 }}>Winter Sale</h4>
        </Box>
        <Box>
        <img src="https://mailbakery.s3.amazonaws.com/wp-content/uploads/2015/06/26160336/j_jill.gif" style={{ width: "300px",  height: "300px"}}/>
        </Box>
      </Box>
    </Grid>

    </div>
  );
};

export default TrendSide;
