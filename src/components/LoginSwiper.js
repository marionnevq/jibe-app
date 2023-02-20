import React, { useState } from 'react';
import { Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import { Navigation, EffectMode, EffectFade } from 'swiper';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import "../style/swiper.css";
import { Button, Card, Typography } from '@mui/material';

const LoginSwiper = () => {
    const [imageUrl, setImageUrl] = useState(null);
    const [form, setForm] = useState({
      firstname: "",
      lastname: "",
      email: "",
      username: "",
      password: "",
      confirmPwd: "",
      image: "",
  });
  
  const handleImage = (event) => {
      const img = event.target.files[0];
        setImageUrl(URL.createObjectURL(img));
        setForm({
          ...form,
          image: img
        });
        console.log(form);
        console.log(img);
      }
      
 
  
  return (
    <div className= "container" >
        <Swiper
            modules={[Navigation, EffectFade]}
            navigation
            effect
            speed={800}
            slidesPerView={1}
            loop
            className = 'myswiper'
        >
            <SwiperSlide className='swiperslide' style={{backgroundColor: "pink", alignItems: "center", display: "flex", justifyContent: "center", height: "100vh"}}>
                <Card style={{width: "80%"}}>
                <div><img src={imageUrl}/></div>
                <div style={{display: 'flex', justifyContent: "center"}}>
                    <Button
                        variant="contained"
                        component="label"
                        className='img-btn'
                        sx={{marginBottom: "15px"}}
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
                </Card>
            </SwiperSlide>
            <SwiperSlide className='swiperslide'>
            <img src='https://picsum.photos/200/300'></img>
            </SwiperSlide>
            <SwiperSlide className='swiperslide'>
            <img src='https://picsum.photos/200/300'></img>
            </SwiperSlide>
            <SwiperSlide className='swiperslide'>
            <img src='https://picsum.photos/200/300'></img>
            </SwiperSlide>
        </Swiper>   
    </div>
  )
}

export default LoginSwiper