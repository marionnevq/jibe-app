import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Navigation, Keyboard, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import FollowCard from "./FollowCard";
import txtlogo from "../images/nav1.png";
import Like1 from "../images/onboard1.png";
import Like2 from "../images/onboard.png";
import alternate from "../images/alternate.jpg";
import { useNavigate } from "react-router-dom";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "../style/swiper.css";
import "swiper/css";
import * as userService from "../services/user";
import { USER_ACCOUNT } from "../Data/sample";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../services/firebase";
import Loading from "../images/Loading.gif";

const LoginSwiper = () => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "#fff",
    pt: 1,
    pl: 1,
    pr: 1,
    borderRadius: 25,
  };

  const [like, setLike] = useState(true);
  const [imageUrl, setImageUrl] = useState(null);
  //marionne
  const [imageUpload, setImageUpload] = useState(null);
  const [bio, setBio] = useState(null);
  const swiperRef = useRef(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChangeIcon = () => {
    if (like === true) {
      setLike(false);
    }
    setTimeout(function () {
      userService.updateCurrentUser({ firstTimeLogin: false }).then(() => {
        navigate("/feed");
      });
    }, 400);
  };

  const handleImage = (event) => {
    const img = event.target.files[0];
    setImageUpload(img);
    setImageUrl(URL.createObjectURL(img));
    console.log(img);
  };

  const handleBio = (event) => {
    setBio(event.target.value);
  };

  //marionne
  const handleSaveChanges = () => {
    if (imageUpload == null) return;
    setLoading(true);
    const imageRef = ref(
      storage,
      `images/profileImage_${userService.getCurrentUser().id}`
    );

    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      const path = snapshot.metadata.fullPath;
      const uRef = ref(storage, path);
      getDownloadURL(uRef).then((url) => {
        userService.updateCurrentUser({ imageUrl: url, bio });
        setLoading(false);
        swiperRef.current.swiper.slideTo(2);
      });
    });
  };

  return (
    <>
      <Modal open={loading}>
        <Box sx={style}>
          <img src={Loading} />
        </Box>
      </Modal>
      <Grid container sx={{ minHeight: "100vh" }}>
        <Grid container item>
          <Swiper
            effect
            speed={500}
            pagination={{
              type: "progressbar",
              clickable: true,
            }}
            slidesPerView={1}
            navigation={true}
            modules={[Keyboard, Pagination, Navigation]}
            className="myswiper"
            ref={swiperRef}
          >
            <Grid item xs={12} sm={6}>
              <SwiperSlide className="swiperslide">
                <Paper className="paper" id="first">
                  <div className="first-text">
                    <h1>hi.</h1>
                  </div>
                </Paper>
              </SwiperSlide>
            </Grid>
            <SwiperSlide className="swiperslide">
              <Paper className="paper" id="second">
                <Grid className="second-container" container>
                  <Grid item xs={12} sm={12}>
                    <div>
                      <div className="icon">
                        {imageUrl ? (
                          <img className="preview" src={imageUrl} />
                        ) : (
                          <img className="preview" src={alternate} />
                        )}
                      </div>
                      <div className="icon">
                        <Button
                          variant="contained"
                          component="label"
                          className="img-btn"
                          sx={{ backgroundColor: "#EB4660" }}
                        >
                          <Typography
                            sx={{
                              fontFamily: "montserrat",
                              fontSize: "12px",
                            }}
                          >
                            Choose Profile Picture
                          </Typography>
                          <input
                            accept="image/*"
                            type="file"
                            hidden
                            onChange={(event) => handleImage(event)}
                          />
                        </Button>
                      </div>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={12} className="icon">
                    <div style={{ width: "100%" }}>
                      <div className="icon">
                        <TextField
                          id="outlined-multiline-static"
                          label="Your Bio"
                          variant="filled"
                          multiline
                          rows={5}
                          className="bio"
                          onChange={(event) => handleBio(event)}
                        />
                      </div>
                      <div className="icon">
                        <Button
                          variant="contained"
                          component="label"
                          className="img-btn"
                          sx={{ backgroundColor: "#EB4660" }}
                          onClick={handleSaveChanges}
                        >
                          add changes
                        </Button>
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </Paper>
            </SwiperSlide>
            <SwiperSlide className="swiperslide">
              <Paper className="paper" id="third-slide">
                <div className="third">
                  <div>
                    <img id="image" src={txtlogo} />
                  </div>
                  <div>
                    <div id="follow">follow </div>
                  </div>
                  <div>
                    <FollowCard />
                  </div>
                </div>
              </Paper>
            </SwiperSlide>
            <SwiperSlide className="swiperslide">
              <Paper className="paper" id="forth">
                <div className="last-btn">
                  <button onClick={handleChangeIcon}>
                    {like ? <img src={Like1} /> : <img src={Like2} />}
                  </button>
                  <h1>enjoy jibing.</h1>
                </div>
              </Paper>
            </SwiperSlide>
          </Swiper>
        </Grid>
      </Grid>
    </>
  );
};

export default LoginSwiper;
