import React from 'react';
import { Button, Grid } from "@mui/material";
import "../style/NotFound.css";
import notfound from "../images/bg1.png";
import { useNavigate } from 'react-router';


const NotFound = () => {

  const navigate = useNavigate();

  const handleGoBackHome = async (event) => {
    navigate("/feed")
};

  return (
    <div className="App">
      <Grid bgcolor={"white"} className="feedPage" container>
        <Grid className="profileSide" item xs={4} sm={6}>
          <div className="mainPage">
            <div className="opps">
              <h1>Oops!</h1>
              <p>The page you are looking for</p>
              <p>can’t be found</p>
              </div>
              <div className='btn'>
                <Button variant="contained" onClick={handleGoBackHome}>
                    Go home&#8594;
                </Button>
            </div>
          </div>
        </Grid>
        <Grid className="profileSide" item xs={4} sm={6}>
          <div className="searchImg">
              <img src={notfound}/>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default NotFound