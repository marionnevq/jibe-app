import { useRef, useState } from "react";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "../style/swiper.css";
import "swiper/css";
import Joi from "joi";
import * as userService from "../services/user";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../services/firebase";

import { useNavigate } from "react-router-dom";
import {
  Button,
  Grid,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Navigation, Keyboard, Pagination } from "swiper";
import alternate from "../images/alternate.jpg";
import txtlogo from "../images/nav1.png";
import { Swiper, SwiperSlide } from "swiper/react";
import Like1 from "../images/onboard1.png";
import Like2 from "../images/onboard.png";
import FollowCard from "./FollowCard";

const LoginSwiper = ({ setLoading }) => {
  const [like, setLike] = useState(true);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);
  const [errors, setErrors] = useState({});
  const [isError, setIsError] = useState(false);
  const [bio, setBio] = useState({
    bio: "",
  });
  const swiperRef = useRef(null);

  const navigate = useNavigate();
  const schema = Joi.object({
    bio: Joi.string().allow("").min(0).max(150).optional(),
  });

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
        console.log(url);
        swiperRef.current.swiper.slideTo(2);
      });
    });
  };

  const handleImage = (event) => {
    const img = event.target.files[0];
    setImageUrl(URL.createObjectURL(img));
    setImageUpload(img);
    console.log(imageUpload);
    console.log(img);
  };

  const handleChange = ({ currentTarget: input }) => {
    setBio(input.value);

    const { error } = schema
      .extract(input.name)
      .label(input.name)
      .validate(input.value);

    if (error) {
      setIsError(true);
      setErrors({ ...errors, [input.name]: "Maximum of 150 Characters" });
    } else {
      delete errors[input.name];
      setErrors(errors);
    }
  };

  return (
    <>
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
                          <Typography id="save">
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
                          name="bio"
                          error={!!errors.bio}
                          helperText={errors.bio}
                          onChange={handleChange}
                          value={bio.bio}
                          id="outlined-multiline-static"
                          label="Your Bio"
                          variant="filled"
                          multiline
                          rows={5}
                          className="bio"
                        />
                      </div>
                      <div className="icon">
                        <Button
                          variant="contained"
                          component="label"
                          className="img-btn"
                          sx={{ backgroundColor: "#EB4660" }}
                          onClick={handleSaveChanges}
                          disabled={isError ? true : false}
                        >
                          <Typography id="save">Save changes</Typography>
                        </Button>
                        `
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
