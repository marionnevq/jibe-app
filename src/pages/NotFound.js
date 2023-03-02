import { Box, Button, Grid } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import notfound from "../images/nfIcon.png";
import "../style/NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Grid container className="notFound">
      <Grid
        className="leftSide"
        item
        xs={12}
        sm={6}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <Grid sx={{ width: "100%", height: "210px" }}>
          <Box sx={{ display: "flex", height: "120px" }}></Box>
          <Box sx={{ display: "flex", height: "130px" }}>
            <Box className="header" sx={{ width: "25%" }}></Box>
            <Box className="header" sx={{ width: "75%" }}>
              <h1>Oops!</h1>
            </Box>
          </Box>
          <Box sx={{ display: "flex", marginTop: "15px" }}>
            <Box className="header" sx={{ width: "25%", height: "80px" }}></Box>
            <Box className="subheader" sx={{ width: "75%", height: "80px" }}>
              <h5>The page you are looking</h5>
              <h5>for can't be found.</h5>
            </Box>
          </Box>

          <Box sx={{ display: "flex", height: "30px", marginTop: "5px" }}>
            <Box className="header" sx={{ width: "25%" }}></Box>
            <Box className="subheader" sx={{ width: "75%" }}>
              <Button
                className="backBtn"
                sx={{
                  backgroundColor: "white",
                  color: "#2C3568",
                  fontFamily: "Montserrat",
                  borderRadius: "30px",
                  width: "150px",
                  fontWeight: "800",
                }}
                onClick={() => {
                  navigate(`/feed`);
                }}
              >
                Go Back &#8594;
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid className="rightSide" item xs={12} sm={6}>
        <Grid item className="nfPhoto">
          <img src={notfound} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default NotFound;
