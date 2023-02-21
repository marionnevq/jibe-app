import React, { useState } from 'react';
import { Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import { Navigation, Keyboard, Pagination } from 'swiper';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import "swiper/css/pagination";
import "../style/swiper.css";
import { Button, Card, Grid, IconButton, Paper, TextField, Typography } from '@mui/material';
import logo from "../images/logo-noblack-label.png"
import txtlogo from "../images/nav.png"
import { color } from '@mui/system';
import { Link } from 'react-router-dom';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
const LoginSwiper = () => {
    const [imageUrl, setImageUrl] = useState(null);
  
    const handleImage = (event) => {
      const img = event.target.files[0];
        setImageUrl(URL.createObjectURL(img));
        console.log(img);
    }
      
 
  
return (
    <>
    <Grid container sx={{ minHeight: "100vh"}}>
        <Grid container item>
                <Swiper
                    effect
                    speed={500}
                    slidesPerView={1}
                    spaceBetween={0}
                    keyboard={{
                      enabled: true,
                    }}
                    pagination={{
                      clickable: true,
                    }}
                    
                    navigation={true}
                    modules={[Keyboard, Pagination, Navigation]}
                    className = 'myswiper'
                    sx={{width: "100%", height: "auto"}}
                 >
                <Grid item xs={12} sm={6}>
                    <SwiperSlide className='swiperslide' style={{backgroundColor: "#EEE8DB", alignItems: "center", display: "flex", justifyContent: "center"}}>
                    <Paper sx={{width: "90%", height: "90%", backgroundColor: "white", paddingBottom: "15px"}}>
                        <div style={{display: "flex", alignItems: "center", justifyContent: "center", lineHeight: "10px", textAlign: "center", width: "80%"}}>
                            <div>
                            <img src={logo} style={{width: "100px", height: "auto", marginBottom: "-10px"}}></img>
                            </div>
                            <div  style={{display: "block"}}>
                                <h1 style={{fontFamily: "montserrat", fontSize: "50px", color: "#2C3568", wordBreak: "break-word", fontWeight: "normal", lineHeight: "50px"}}>Welcome</h1>
                                <h3 style={{fontFamily: "poppins", fontSize: "20px", color: "#EB4660", wordBreak: "break-word", fontWeight: "bolder"}}>Jim Lloyd</h3>
                            </div>
                        </div>
                        </Paper>
                    </SwiperSlide>
                </Grid>
                    <SwiperSlide className='swiperslide' style={{backgroundColor: "#EEE8DB",  height: "auto", display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <Paper sx={{width: "90%", height: "90%", backgroundColor: "white", paddingBottom: "15px"}}>
                        <Grid container sx={{alignItems: "center", display: "flex", justifyContent: "center", height: "100%"}}>
                            <Grid item xs={12} sm={12} sx={{height: "auto"}}>
                                <div sx={{width: "80%", height: "80vh", display: "flex", justifyContent: "center", backgroundColor: "white", verticalAlign: "mid"}}>
                                    <div style={{display: "flex", alignItems: "center", justifyContent: "center", objectFit: "scale-down"}}>
                                        <img src={imageUrl} className="preview" style={{maxWidth: "150px", height:"auto", borderRadius: "100px", borderColor: "white", borderStyle: "solid", marginTop: "40px", marginBottom: "20px"}}/>
                                    </div>
                                    <div style={{display: 'flex', justifyContent: "center", alignItems: "center"}}>
                                        <Button
                                            variant="contained"
                                            component="label"
                                            className='img-btn'
                                        >
                                        <Typography sx={{fontFamily: "montserrat", fontSize: "12px"}}>Choose Profile Picture</Typography>
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
                            <Grid item xs={12} sm={6} sx={{height: "auto", display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <TextField
                                id="outlined-multiline-static"
                                label="Your Bio"
                                variant='filled'
                                multiline
                                rows={5}
                                className= "bio"
                                sx={{backgroundColor: "white", width: "60%", borderRadius: "10px", marginBottom: "40px", marginTop: "15px"}}
                            />
                            </Grid>
                        </Grid>
                        </Paper>
            </SwiperSlide>
            <SwiperSlide className='swiperslide' style={{backgroundColor: "white", alignItems: "center", display: "flex", justifyContent: "center", height: "auto"}}>
                <Paper sx={{height: "90%", width: "60%", backgroundColor: "#f2f2f2", display: "flex", justifyContent: "center", alignItems: "center"}}>
                    
                    <div style={{display: "block", textAlign: "center", lineHeight: "2px"}}>
                    <div><img src={txtlogo} style={{width: "150px", marginTop: "15px"}}/></div>
                    <div><h1 style={{fontFamily: "montserrat", fontSize: "20px"}}>Suggested People</h1></div>
                    </div>
                </Paper>
            </SwiperSlide>
            <SwiperSlide className='swiperslide' style={{backgroundColor: "white", alignItems: "center", display: "flex", justifyContent: "center", height: "auto"}}>
                <div style={{display: "block", textAlign: "center", width: "80%", lineHeight: "5px"}}>
                <IconButton LinkComponent={Link} to="/feed" className="last-btn">
                        
                        <DoubleArrowIcon sx={{fontSize: "150px", color: "#EB4660"}}/>
                    </IconButton>
                    <h1 style={{fontFamily: "montserrat", fontSize: "50px", color: "#2C3568", wordBreak: "break-word", lineHeight: "50px"}}>Enjoy Jibing...</h1>
                </div>
            </SwiperSlide>
        </Swiper>  
        </Grid> 
</Grid></>
  )
}

export default LoginSwiper